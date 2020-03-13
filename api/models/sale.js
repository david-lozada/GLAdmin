'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    idCustomer: DataTypes.INTEGER,
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    paymentMethod: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  Sale.associate = function({ Customer }) {
    // associations can be defined here
    Sale.belongsTo(Customer);
  };
  return Sale;
};