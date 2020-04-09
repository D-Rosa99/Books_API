const { Book, inputValidation } = require("./model");
const { Genre } = require("../genre/model");

async function getSpecificBook(userInput) {
  const book = await Book.findOne({ title: userInput }).populate({
    path: "genre",
    select: "name -_id",
  });
  return book;
}

module.exports = {
  getBookList: async (req, res) => {
    const limitPage = 2;
    const page = req.query.page;
    const bookList = await Book.find()
      .skip((page - 1) * limitPage)
      .limit(limitPage)
      .populate({
        path: "genre",
        select: "name -_id",
      });

    return res.status(200).json(bookList);
  },

  getBook: async (req, res) => {
    const book = await getSpecificBook(req.params.title);
    if (!book) return res.status(404).send("That book does not exist!");

    return res.status(200).json(book);
  },

  postBook: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const book = await getSpecificBook(value.title);
    if (book) return res.status(400).send("That book already exist!");

    const getGenre = await Genre.findOne({ name: value.genre });
    if (!getGenre) return res.status(404).send("That genre does not exist!");

    value.genre = getGenre._id;
    const newBook = new Book(value);
    await newBook.save();
    return res.status(200).send("Add it successfully!");
  },

  updateBook: async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const findBook = await getSpecificBook(value.title);
    if (findBook) return res.status(400).send("That book already exist!");

    const getGenre = await Genre.findOne({ name: value.genre });
    if (!getGenre) return res.status(404).send("That genre does not exist!");

    value.genre = getGenre._id;
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      { $set: value },
      { useFindAndModify: false }
    );
    if (!book) return res.status(400).send("That book does not exist!");

    return res.status(200).send("Update it successfully!");
  },

  deleteBook: async (req, res) => {
    const book = await Book.findOneAndDelete(
      { title: req.params.title },
      { useFindAndModify: false }
    );
    if (!book) return res.status(404).send("That book does not exist!");

    return res.status(200).send("Delete it successfully!");
  },
};
