import Sequelize from 'sequelize';
import Joi from '@hapi/joi';

import db from '../init/db_startUp';

const Book = db.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numPage: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  publicDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

const bookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: Joi.string().required(),
  numPage: Joi.number().required(),
});

export { Book, bookSchema };
