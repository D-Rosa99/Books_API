const { Genre, inputValidation } = require("./model");

async function getSpecificGenre(userInput) {
  const genre = await Genre.findOne({ name: userInput });
  return genre;
}

module.exports = {
  getGenreList: async (req, res) => {
    const genreList = await Genre.find();
    return res.status(200).json(genreList);
  },

  getGenre: async (req, res) => {
    const genre = await getSpecificGenre(req.params.name);
    if (!genre) return res.status(404).send("That genre does not exist!");

    return res.status(200).json(genre);
  },

  postGenre: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await getSpecificGenre(value.name);
    if (genre) return res.status(400).send("That genre already exist!");

    const newGenre = new Genre(value);
    await newGenre.save();
    return res.status(200).send("Add it successfully!");
  },

  updateGenre: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const findGenre = await getSpecificGenre(value.name);
    if (findGenre) return res.status(400).send("That genre already exist!");

    const genre = await Genre.findOneAndUpdate(
      { name: req.params.name },
      { $set: value },
      { useFindAndModify: false }
    );
    if (!genre) return res.status(400).send("That genre does not exist!");

    return res.status(200).send("Update it successfully!");
  },

  deleteGenre: async (req, res) => {
    const genre = await Genre.findOneAndDelete(
      { name: req.params.name },
      { useFindAndModify: false }
    );
    if (!genre) return res.status(404).send("That genre does not exist!");

    return res.status(200).send("Delete it successfully!");
  },
};
