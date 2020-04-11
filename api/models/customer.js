'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    idCardNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    available: DataTypes.BOOLEAN
  }, {});
  Customer.associate = function({ Sale }) {
    // associations can be defined here
    Customer.hasMany(Sale);
  };
  return Customer;
};