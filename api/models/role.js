'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {});
  Role.associate = function({ User }) {
    // associations can be defined here
    Role.hasMany(User,  {as: 'role',foreignKey: 'idRole'});
  };
  return Role;
};