'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    dollarPrice: DataTypes.DECIMAL,
    idTax: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    image: DataTypes.JSON
  }, {});
  /**
   *  TODO: User may input default price not updating dollar value
   */
  Product.associate = function({ Tax, Stock }) {
    // associations can be defined here
    Product.belongsTo(Tax,  {as: 'tax',foreignKey: 'idTax'});
  };

  Product.beforeCreate(async (product, options) => {
  })
  return Product;
};