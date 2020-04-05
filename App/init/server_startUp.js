const morgan = require("morgan");
const express = require("express");
const book_routers = require("../book/routers");

module.exports = (app) => {
  //   app.use("/api/book/", book_routers);
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/", (req, res) => res.send("<h1>Hello World!!</h1>"));
  app.listen(3000, () => console.log("Server started on port 3000"));
};
