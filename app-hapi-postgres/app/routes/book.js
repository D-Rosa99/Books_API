import Sequelize from 'sequelize';
import { Book, bookSchema } from '../models/book';
import Joi from '@hapi/joi';

const Op = Sequelize.Op;

export default [
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const { limitPage = 2, page = 1, author, title } = request.query;
      const ignoreNumber = limitPage * page - limitPage;
      const getBook = await Book.findAndCountAll({
        where: {
          [Op.or]: [
            { author: { [Op.iLike]: `%${author}%` } },
            { title: { [Op.iLike]: `%${title}%` } },
          ],
        },
        limit: limitPage,
        offset: ignoreNumber,
      });
      const has_next_page = getBook.count > ignoreNumber + limitPage;

      return h.response({
        total_records: getBook.count,
        data: getBook.rows,
        currentPage: page,
        has_next_page,
      });
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: async (request, h) => {
      try {
        const userInput = request.payload;
        const setBook = await Book.create(userInput);
        return h.response(setBook);
      } catch (error) {
        return error;
      }
    },
    options: {
      validate: { payload: bookSchema },
      response: {
        schema: Joi.array().items(bookSchema),
        failAction: 'log',
      },
    },
  },
  {
    method: 'DELETE',
    path: '/{title}',
    handler: async (request) => {
      try {
        await Book.destroy(request.params);
        return 'Deleted it Succesfully';
      } catch (error) {
        return error;
      }
    },
  },
  {
    method: 'PUT',
    path: '/{title}',
    handler: async (request, h) => {
      try {
        const updateBook = await Book.update(request.payload, {
          where: request.params,
        });
        return h.response(updateBook);
      } catch (error) {
        return error;
      }
    },
  },
];
