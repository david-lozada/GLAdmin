'use strict';
module.exports = (sequelize, DataTypes) => {
  const SalesDet = sequelize.define('SalesDet', {
    idSale: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    observation: DataTypes.TEXT
  }, {});
  SalesDet.associate = function(models) {
    // associations can be defined here
  };
  return SalesDet;
};