const morgan = require("morgan");
const express = require("express");
const app = express();

const genreRouters = require("../genre/routers");
const bookRouters = require("../book/routers");

module.exports = () => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api/Book_API/genre/", genreRouters);
  app.use("/api/Book_API/book/", bookRouters);
  app.listen(3000, () => console.log("Server started on port 3000"));
};
