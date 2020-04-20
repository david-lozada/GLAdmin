'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    dollarPrice: DataTypes.DECIMAL,
    existence: DataTypes.INTEGER,
    entryDate: DataTypes.DATE,
    idSupplier: DataTypes.INTEGER,
    idTax: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    image: DataTypes.JSON
  }, {});
  Product.associate = function({ Supplier, Tax }) {
    // associations can be defined here
    Product.belongsTo(Supplier,  {as: 'supplier',foreignKey: 'idSupplier'});
    Product.belongsTo(Tax,  {as: 'tax',foreignKey: 'idTax'});
  };

  Product.afterCreate(async (record, options) => {
    console.log(record, options)
  });
  return Product;
};