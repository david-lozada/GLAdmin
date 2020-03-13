'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderDet = sequelize.define('PurchaseOrderDet', {
    idPurchaseOrder: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    observation: DataTypes.TEXT
  }, {});
  PurchaseOrderDet.associate = function(models) {
    // associations can be defined here
  };
  return PurchaseOrderDet;
};