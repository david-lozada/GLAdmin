'use strict';
module.exports = (sequelize, DataTypes) => {
  const ForeignExchange = sequelize.define('ForeignExchange', {
    value: DataTypes.DECIMAL,
    idCurrency: DataTypes.INTEGER
  }, {});
  ForeignExchange.associate = function({ Product }) {
    // associations can be defined here
    ForeignExchange.belongsToMany(Product, {through: 'ProductsForeignExchanges', foreignKey: 'idForeignExchange'});

  };

  ForeignExchange.afterCreate(async (foreingExchange, options) => {
    //Look for lastest dollar value
    const products = await sequelize.models.Product.findAll({ where: { available: true } })
    	.then(async(res) => {
		    for(let product of res) {
		    	product.price = parseInt(product.dollarPrice) * foreingExchange.value
		    	await product.save()
		    }
    	})
    	.catch((err) => console.log(err))
    return foreingExchange
  })
  return ForeignExchange;
};