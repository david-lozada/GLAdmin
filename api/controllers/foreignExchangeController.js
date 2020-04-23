// Dependencies
const Sequelize = require('sequelize');

// User Model
var { ForeignExchange } = require('../models');


// Get User Info
exports.getForeignExchange = async function (req, res) {
  try {
      let foreingExchange = await ForeignExchange.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
      });
      console.log(foreingExchange)
      if (foreingExchange) {
          return res.status(200).json(foreingExchange);
      }
  } catch(err) {
      return res.status(400).send(err);
  }
}