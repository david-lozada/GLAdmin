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
      if (foreingExchange) {
          return res.status(200).json(foreingExchange);
      }
  } catch(err) {
      return res.status(400).send(err);
  }
}

// Save dollar valur
exports.create = async function (req, res) {
  try {
    const data = req.body
    let [foreingExchange, created] = await ForeignExchange.findOrCreate({
      where: { value: data.foreignExchange },
      defaults: {value: data.foreignExchange}
    });
    if (created) {
      return res.status(201).json({
          en: 'Foreign Exchange has been created',
          es: 'Valor de dólar guardado'
      });
    } else {
      return res.status(200).json({
          en: 'Foreign Exchange is the same',
          es: 'Valor de dólar no ha cambiado'
      });
    }
  } catch(err) {
      return res.status(400).send(err);
  }
}