'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductsCurrencies = sequelize.define('ProductsCurrencies', {
    idProduct: DataTypes.INTEGER,
    idCurrency: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {});
  ProductsCurrencies.associate = function(models) {
    // associations can be defined here
  };
  return ProductsCurrencies;
};