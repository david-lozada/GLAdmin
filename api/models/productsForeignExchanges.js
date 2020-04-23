'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductsForeignExchanges = sequelize.define('ProductsForeignExchanges', {
    idProduct: DataTypes.INTEGER,
    idForeignExchange: DataTypes.INTEGER,
  }, {});
  ProductsForeignExchanges.associate = function(models) {
    // associations can be defined here
  };
  return ProductsForeignExchanges;
};