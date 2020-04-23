import { Genre, inputValidation } from './model';

async function getSpecificGenre(userInput) {
  const genre = await Genre.findOne({ name: userInput });
  return genre;
}

export default {
  getGenreList: async (req, res) => {
    const { limitPage = 2, page } = req.query;

    if (page && page > 0) {
      return Genre.find()
        .countDocuments()
        .then(async (totalGenre) => {
          const skipPg = (page - 1) * limitPage;
          const restGenre = totalGenre - limitPage * parseInt(page);
          const currentPage = parseInt(page);

          const genreList = await Genre.find().skip(skipPg).limit(limitPage);

          res.status(200).json({
            totalGenre,
            restOfGenre: restGenre > 0 ? restGenre : 0,
            currentPage,
            nextPage: restGenre > 0 ? currentPage + 1 : false,
            prevPage: page - 1 <= 0 ? false : page - 1,
            genreList,
          });
        });
    }

    if (page < 0)
      return res.status(400).send('The page should be greater than 0');

    const genreList = await Genre.find().limit(parseInt(limitPage));
    return res.status(200).json(genreList);
  },

  getGenre: async (req, res) => {
    const genre = await getSpecificGenre(req.params.name);
    if (!genre) return res.status(404).send('That genre does not exist!');

    return res.status(200).json(genre);
  },

  postGenre: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await getSpecificGenre(value.name);
    if (genre) return res.status(400).send('That genre already exist!');

    const newGenre = new Genre(value);
    await newGenre.save();
    return res.status(200).send('Add it successfully!');
  },

  updateGenre: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const findGenre = await getSpecificGenre(value.name);
    if (findGenre) return res.status(400).send('That genre already exist!');

    const genre = await Genre.findOneAndUpdate(
      { name: req.params.name },
      { $set: value },
      { useFindAndModify: false }
    );
    if (!genre) return res.status(400).send('That genre does not exist!');

    return res.status(200).send('Update it successfully!');
  },

  deleteGenre: async (req, res) => {
    const genre = await Genre.findOneAndDelete(
      { name: req.params.name },
      { useFindAndModify: false }
    );
    if (!genre) return res.status(404).send('That genre does not exist!');

    return res.status(200).send('Delete it successfully!');
  },
};
