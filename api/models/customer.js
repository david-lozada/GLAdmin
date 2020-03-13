'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    idCardNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Customer.associate = function({ Sale }) {
    // associations can be defined here
    Customer.hasMany(Sale);
  };
  return Customer;
};