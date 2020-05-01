'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  });

  // set up the associations so we can make queries that include
  // the related objects
  User.associate = async function ({ AuthToken, Role }) {
    User.hasMany(AuthToken);
    User.belongsTo(Role,  {as: 'role',foreignKey: 'idRole'});
  };

  User.beforeDestroy(async (user, options) => {
    const master = await sequelize.models.Role.findOne({
      where: { slug: 'master' }
    })
    if (user.idRole === master.id) {
      return Promise.reject(new Error("Usuario con rol Master no puese ser eliminado"));
    }
  });

  // This is a class method, it is not called on an individual
  // user object, but rather the class as a whole.
  // e.g. User.authenticate('user1', 'password1234')
  User.authenticate = async function(userName, password) {
    try {
      const user = await User.findOne({ where: { userName } });
      // bcrypt is a one-way hashing algorithm that allows us to 
      // store strings on the database rather than the raw
      // passwords. Check out the docs for more detail
      const match = await bcrypt.compare(password, user.password);
      if(match) {
        return user.authorize();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this    
    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const authToken = await AuthToken.generate(this.id);
    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken);
    return { user, authToken }
  };


  User.prototype.logout = async function (token) {

    // destroy the auth token record that matches the passed token
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return User;
};