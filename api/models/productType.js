'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('ProductType', {
    name: DataTypes.STRING,
    observation: DataTypes.STRING
  }, {});
  ProductType.associate = function(models) {
    // associations can be defined here
  };
  return ProductType;
};