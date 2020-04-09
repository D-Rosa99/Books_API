const mongoose = require("mongoose");

module.exports = () =>
  mongoose
    .connect("mongodb://localhost:27017/Book_API", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connect!"))
    .catch((err) => console.log("Somethin went wrong! ", err));
