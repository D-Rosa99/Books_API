import Sequelize from 'sequelize';
import Joi from '@hapi/joi';

import db from '../init/db_startUp';

const Genre = db.define('genre', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const genreSchema = Joi.object({
  name: Joi.string().min(2).required(),
});
export { Genre, genreSchema };
