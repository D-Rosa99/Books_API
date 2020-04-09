const express = require("express");
const router = express.Router();
const bookControllers = require("./controllers");

router.get("/", bookControllers.getGenreList);

router.get("/:name", bookControllers.getGenre);

router.post("/", bookControllers.postGenre);

router.put("/:name", bookControllers.updateGenre);

router.delete("/:name", bookControllers.deleteGenre);

module.exports = router;
