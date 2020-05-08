const Sequelize = require('sequelize');

const db = new Sequelize('intellisys-training', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
