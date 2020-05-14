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
      },
      set: function(date) {
        if(moment(date, 'YYYY-MM-DD').isValid()) {
          this.setDataValue('expiryDate', date)
        } else {
          this.setDataValue('expiryDate', null)
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
    var updated = false
    //Look for stock parent with all details
    const stock = await sequelize.models.Stock.findOne({
      where: { id: stockDet.idStock },
      include: [
        { model: sequelize.models.StockDet, as: 'stockDet' }
      ]
    })
    .then(function(stock) { 
      let result = 0
      //Loop through every detail 
      for(let detail of stock.stockDet) {
        //Concat quantity depending on type of stock (entry + or exit -)
        result += (detail.type === 1) ? detail.quantity: -detail.quantity 
      }
      if (result > stock.existence) {
        //Update existence on Stock
        stock.existence = result
        stock.save()
      }
    })
    .catch(function(err) { console.log(err) })
    return stock
  })
  return StockDet;
};