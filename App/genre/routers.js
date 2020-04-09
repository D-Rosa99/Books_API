const express = require("express");
const router = express.Router();
const genreControllers = require("./controllers");

router.get("/", genreControllers.getGenreList);

router.get("/:name", genreControllers.getGenre);

router.post("/", genreControllers.postGenre);

router.put("/:name", genreControllers.updateGenre);

router.delete("/:name", genreControllers.deleteGenre);

module.exports = router;
