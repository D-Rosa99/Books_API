import { Genre, inputValidation } from './model';

async function getSpecificGenre(userInput) {
  const genre = await Genre.findOne({ name: userInput });
  return genre;
}

export default {
  getGenreList: (req, res) => {
    const limitPage = 2;
    const page = req.query.page;
    if (page && page > 0) {
      return Genre.find()
        .countDocuments()
        .then(async (totalGenre) => {
          const skipPg = (page - 1) * limitPage;
          const restGenre =
            totalGenre -
            (parseInt(page) === 1 ? limitPage : limitPage * parseInt(page));
          const currentPage = parseInt(page) || 1;

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

    return res.status(400).send('Please specify the page you want to reach!');
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
