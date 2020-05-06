'use strict';
// Dependencies
const moment = require('moment')
moment.locale('es');

module.exports = (sequelize, DataTypes) => {
  const StockDet = sequelize.define('StockDet', {
    idStock: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
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
    observation: DataTypes.TEXT,
  }, {});
  StockDet.associate = function({ Stock }) {
    // associations can be defined here
    StockDet.belongsTo(Stock,  {as: 'stockDet', foreignKey: 'idStock'});
  };
  StockDet.beforeCreate(async (stockDet, options) => {
    if(moment(stockDet.expiryDate, 'YYYY-MM-DD').isValid()) {
      stockDet.expiryDate = stockDet.expiryDate
    } else {
      stockDet.expiryDate = null
    }
  })
  return StockDet;
};