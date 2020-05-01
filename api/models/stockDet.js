'use strict';
module.exports = (sequelize, DataTypes) => {
  const StockDet = sequelize.define('StockDet', {
    idStock: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {});
  StockDet.associate = function(models) {
    // associations can be defined here
  };
  return StockDet;
};