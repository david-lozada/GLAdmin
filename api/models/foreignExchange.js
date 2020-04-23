'use strict';
module.exports = (sequelize, DataTypes) => {
  const ForeignExchange = sequelize.define('ForeignExchange', {
    value: DataTypes.DECIMAL,
    idCurrency: DataTypes.INTEGER
  }, {});
  ForeignExchange.associate = function(models) {
    // associations can be defined here
  };
  return ForeignExchange;
};