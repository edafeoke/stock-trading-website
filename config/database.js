const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stock_trading_dev', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
