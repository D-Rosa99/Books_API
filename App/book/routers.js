const express = require("express");
const router = express.Router();
const bookControllers = require("./controllers");

router.get("/", bookControllers.getBookList);

router.get("/:title", bookControllers.getBook);

router.post("/", bookControllers.postBook);

router.put("/:title", bookControllers.updateBook);

router.delete("/:title", bookControllers.deleteBook);

module.exports = router;
