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
    type: DataTypes.INTEGER,
    expiryDate: {
      type: DataTypes.DATE,
      get: function(date) {
        const newDate = this.getDataValue(date);
        if (moment(newDate).isValid()) {
          const parsedDate = moment(newDate).format('LLL');
          return parsedDate
        }
      }
    },
    available: DataTypes.BOOLEAN
  }, {});
  Stock.associate = function({ Product, Supplier, Batch }) {
    // associations can be defined here
    Stock.belongsTo(Product,  {as: 'product',foreignKey: 'idProduct'});
    Stock.belongsTo(Supplier,  {as: 'supplier',foreignKey: 'idSupplier'});
    Stock.belongsTo(Batch,  {as: 'batch',foreignKey: 'idBatch'});
  };

  Stock.beforeCreate(async (stock, options) => {
    if(moment(stock.expiryDate, 'YYYY-MM-DD').isValid()) {
      stock.expiryDate = stock.expiryDate
    } else {
      stock.expiryDate = null
    }
  })
  return Stock;
};