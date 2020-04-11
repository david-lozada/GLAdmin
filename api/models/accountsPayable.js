'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccountsPayable = sequelize.define('AccountsPayable', {
    idPurchaseOrder: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    issueDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    credit: DataTypes.DECIMAL,
    status: DataTypes.INTEGER
  }, {});
  AccountsPayable.associate = function({ PurchaseOrder }) {
    // associations can be defined here
    AccountsPayable.belongsTo(PurchaseOrder,  {as: 'purchaseOrder',foreignKey: 'idPurchaseOrder'});
  };
  return AccountsPayable;
};