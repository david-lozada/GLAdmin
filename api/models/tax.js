'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    name: DataTypes.STRING,
    percentage: DataTypes.INTEGER,
    formula: DataTypes.STRING
  }, {});
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};