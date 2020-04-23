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
  Product.associate = function({ Tax }) {
    // associations can be defined here
    Product.belongsTo(Tax,  {as: 'tax',foreignKey: 'idTax'});
  };
  return Product;
};