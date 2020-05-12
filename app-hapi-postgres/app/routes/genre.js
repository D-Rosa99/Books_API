import { Genre, genreSchema } from '../models/genre';
import Joi from '@hapi/joi';

export default [
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      try {
        const getGenre = await Genre.findAll();
        return h.response(getGenre);
      } catch (error) {
        return error;
      }
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: async (request, h) => {
      try {
        const userInput = request.payload;
        const setGenre = await Genre.create(userInput);
        return h.response(setGenre);
      } catch (error) {
        return error;
      }
    },
    options: {
      validate: { payload: genreSchema },
      response: {
        schema: Joi.array().items(genreSchema),
        failAction: 'log',
      },
    },
  },
  {
    method: 'DELETE',
    path: '/{name}',
    handler: async (request, h) => {
      try {
        await Genre.destroy(request.params);
        return 'Deleted it Succesfully';
      } catch (error) {
        return error;
      }
    },
  },
  {
    method: 'PUT',
    path: '/{name}',
    handler: async (request, h) => {
      try {
        const updateGenre = await Genre.update(request.payload, {
          where: request.params,
        });
        return h.response(updateGenre);
      } catch (error) {
        return error;
      }
    },
  },
];
