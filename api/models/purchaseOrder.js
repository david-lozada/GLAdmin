'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    idSupplier: DataTypes.INTEGER,
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    paymentMethod: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  PurchaseOrder.associate = function(models) {
    // associations can be defined here
  };
  return PurchaseOrder;
};