const Sequelize = require('sequelize');

const db = new Sequelize('playground', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
