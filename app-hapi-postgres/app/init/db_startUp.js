import Sequelize from 'sequelize';

const db = new Sequelize('intellisys-training', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
});

export default db;
