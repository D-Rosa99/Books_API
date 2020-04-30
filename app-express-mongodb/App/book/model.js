import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const Book = mongoose.model(
  'Books',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
    author: {
      type: String,
      required: true,
      minlength: 2,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    edition: {
      type: String,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    numberOfChapters: {
      type: Number,
      required: true,
    },
    AddedDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  })
);

const inputValidation = (userInput) => {
  const bookSchema = Joi.object({
    title: Joi.string().min(2).required(),
    genre: Joi.string().min(2).required(),
    author: Joi.string().min(2).required(),
    edition: Joi.string().required(),
    publishDate: Joi.date(),
    numberOfPages: Joi.number().required(),
    numberOfChapters: Joi.number().required(),
  });

  return bookSchema.validate(userInput);
};

export { Book, inputValidation };
