'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    documentNumber: DataTypes.STRING,
    companyName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    available: DataTypes.BOOLEAN
  }, {});
  Supplier.associate = function({ Product }) {
    // associations can be defined here
    Supplier.hasMany(Product,  {as: 'supplier',foreignKey: 'idTax'});
  };
  return Supplier;
};