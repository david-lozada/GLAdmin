'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    existence: DataTypes.INTEGER,
    entryDate: DataTypes.DATE,
    idSupplier: DataTypes.INTEGER,
    idTax: DataTypes.INTEGER,
    observation: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};