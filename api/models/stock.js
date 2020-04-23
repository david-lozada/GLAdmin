'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    code: DataTypes.STRING,
    idProduct: DataTypes.INTEGER,
    idSupplier: DataTypes.INTEGER,
    existence: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    entryDate: DataTypes.DATE,
    expiryDate: DataTypes.DATE,
    available: DataTypes.BOOLEAN
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
  };
  return Stock;
};