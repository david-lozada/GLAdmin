'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(20,0),
    dollarPrice: DataTypes.DECIMAL,
    idTax: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    image: DataTypes.JSON
  }, {});
  /**
   *  TODO: User may input default price not updating dollar value
   */
  Product.associate = function({ Tax, Stock, ForeignExchange }) {
    // associations can be defined here
    Product.belongsTo(Tax,  {as: 'tax',foreignKey: 'idTax'});
    Product.belongsToMany(ForeignExchange, {through: 'ProductsForeignExchanges', foreignKey: 'idProduct'});
  };

  Product.afterCreate(async (product, options) => {
    //Look for lastest dollar value
    const foreingExchange = await sequelize.models.ForeignExchange.findAll({
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(async(fExchange) => {
      //Create many to many association to keep track of product price
      await sequelize.models.ProductsForeignExchanges.create({
        idProduct: product.id,
        idForeignExchange: fExchange[0].id,
        value: product.dollarPrice * fExchange[0].value
      })
      return product
    }).catch((err) => console.log(err))
    return product
  })

  Product.afterUpdate(async (product, options) => {
    //Look for lastest dollar value
    const foreingExchange = await sequelize.models.ForeignExchange.findAll({
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(async(fExchange) => {
      //Create many to many association to keep track of product price
      await sequelize.models.ProductsForeignExchanges.create({
        idProduct: product.id,
        idForeignExchange: fExchange[0].id,
        value: product.price || product.dollarPrice * fExchange[0].value
      })
      return product
    }).catch((err) => console.log(err))
    return product
  })
  return Product;
};