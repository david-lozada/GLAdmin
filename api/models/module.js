'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    name: DataTypes.STRING,
    available: DataTypes.BOOLEAN
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
  };
  return Module;
};