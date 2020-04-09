const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Genre = mongoose.model(
  "Genres",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
  })
);

inputValidation = (userInput) => {
  const genreSchema = Joi.object({
    name: Joi.string().min(2).required(),
  });

  return genreSchema.validate(userInput);
};

module.exports = { Genre, inputValidation };
