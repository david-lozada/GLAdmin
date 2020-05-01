'use strict';
module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    code: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Batch.associate = function(models) {
    // associations can be defined here
  };
  return Batch;
};