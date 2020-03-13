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
  AccountsPayable.associate = function(models) {
    // associations can be defined here
  };
  return AccountsPayable;
};