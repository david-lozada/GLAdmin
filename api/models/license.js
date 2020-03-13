'use strict';
module.exports = (sequelize, DataTypes) => {
  const License = sequelize.define('License', {
    code: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    expiryDate: DataTypes.DATE
  }, {});
  License.associate = function(models) {
    // associations can be defined here
  };
  return License;
};