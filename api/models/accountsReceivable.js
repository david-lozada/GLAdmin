'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccountsReceivable = sequelize.define('AccountsReceivable', {
    idSale: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    issueDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL,
    credit: DataTypes.DECIMAL,
    status: DataTypes.INTEGER
  }, {});
  AccountsReceivable.associate = function(models) {
    // associations can be defined here
  };
  return AccountsReceivable;
};