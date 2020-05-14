'use strict';
// Dependencies
const moment = require('moment')
moment.locale('es');

module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    idProduct: DataTypes.INTEGER,
    idSupplier: DataTypes.INTEGER,
    idBatch: DataTypes.INTEGER,
    existence: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN
  }, {});

  Stock.associate = function({ Product, Supplier, Batch, StockDet }) {
    // associations can be defined here
    Stock.belongsTo(Product,  {as: 'product', foreignKey: 'idProduct'});
    Stock.belongsTo(Supplier,  {as: 'supplier', foreignKey: 'idSupplier'});
    Stock.belongsTo(Batch,  {as: 'batch', foreignKey: 'idBatch'});
    Stock.hasMany(StockDet,  {as: 'stockDet', foreignKey: 'idStock'});
  };
  return Stock;
};