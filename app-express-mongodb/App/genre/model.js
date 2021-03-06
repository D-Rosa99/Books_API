import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
  })
);

const inputValidation = (userInput) => {
  const genreSchema = Joi.object({
    name: Joi.string().min(2).required(),
  });

  return genreSchema.validate(userInput);
};

export { Genre, inputValidation };
