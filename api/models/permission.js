'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permissions', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    name: DataTypes.STRING,
  });

  // set up the associations so we can make queries that include
  // the related objects
  Permission.associate = function ({ User }) {
    // Permission.hasMany(User);
  };

  return Permission;
};