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
  PurchaseOrder.associate = function({ AccountsPayable }) {
    // associations can be defined here
    PurchaseOrder.hasMany(AccountsPayable,  {as: 'purchaseOrder',foreignKey: 'idPurchaseOrder'});
  };
  return PurchaseOrder;
};