import { Book, inputValidation } from './model';
import { Genre } from '../genre/model';

async function getSpecificGenre(genre) {
  const getGenre = await Genre.findOne({ name: genre });
  return getGenre;
}

async function getSpecificBook(userInput) {
  const book = await Book.findOne({ title: userInput }).populate({
    path: 'genre',
    select: 'name -_id',
  });
  return book;
}

export default {
  getBookList: async (req, res) => {
    const {
      limitPage = 2,
      page = 1,
      author,
      title,
      edition,
      genreName,
    } = req.query;
    const existParams = Object.entries(req.query)[0];

    if (existParams && existParams[0] !== 'limitPage' && page > 0) {
      const genre = await getSpecificGenre(genreName);

      return Book.find()
        .or([{ author }, { title }, { edition }, { genre }])
        .countDocuments()
        .then(async (totalBook) => {
          const skipPg = (page - 1) * limitPage;
          const restBook = totalBook - limitPage * parseInt(page);
          const currentPage = parseInt(page);

          const bookList = await Book.find()
            .or([{ author }, { title }, { edition }, { genre }])
            .skip(skipPg)
            .limit(parseInt(limitPage))
            .populate({
              path: 'genre',
              select: 'name -_id',
            });

          res.status(200).json({
            totalBook,
            resOfBook: restBook > 0 ? restBook : 0,
            currentPage,
            nextPage: restBook > 0 ? currentPage + 1 : false,
            prevPage: page - 1 <= 0 ? false : page - 1,
            bookList,
          });
        });
    }

    if (page < 0)
      return res.status(400).send('The page should be greater than 0');

    const bookList = await Book.find().limit(parseInt(limitPage)).populate({
      path: 'genre',
      select: 'name -_id',
    });
    return res.status(200).json(bookList);
  },

  getBook: async (req, res) => {
    const book = await getSpecificBook(req.params.title);
    if (!book) return res.status(404).send('That book does not exist!');

    return res.status(200).json(book);
  },

  postBook: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const book = await getSpecificBook(value.title);
    if (book) return res.status(400).send('That book already exist!');

    const getGenre = await getSpecificGenre(value.genre);
    if (!getGenre) return res.status(404).send('That genre does not exist!');

    value.genre = getGenre._id;
    const newBook = new Book(value);
    await newBook.save();
    return res.status(200).send('Add it successfully!');
  },

  updateBook: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const findBook = await getSpecificBook(value.title);
    if (findBook) return res.status(400).send('That book already exist!');

    const getGenre = await Genre.findOne({ name: value.genre });
    if (!getGenre) return res.status(404).send('That genre does not exist!');

    value.genre = getGenre._id;
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      { $set: value },
      { useFindAndModify: false }
    );
    if (!book) return res.status(400).send('That book does not exist!');

    return res.status(200).send('Update it successfully!');
  },

  deleteBook: async (req, res) => {
    const book = await Book.findOneAndDelete(
      { title: req.params.title },
      { useFindAndModify: false }
    );
    if (!book) return res.status(404).send('That book does not exist!');

    return res.status(200).send('Delete it successfully!');
  },
};
