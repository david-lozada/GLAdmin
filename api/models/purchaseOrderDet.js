'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderDet = sequelize.define('PurchaseOrderDet', {
    idPurchaseOrder: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    observation: DataTypes.TEXT
  }, {});
  PurchaseOrderDet.associate = function({ PurchaseOrder }) {
    // associations can be defined here
    PurchaseOrderDet.belongsTo(PurchaseOrder,  {as: 'purchaseOrder', foreignKey: 'idPurchaseOrder'});
  };
  return PurchaseOrderDet;
};