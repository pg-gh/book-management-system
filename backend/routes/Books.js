const express = require("express");
const multer = require("multer");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { validateBook } = require("../middleware/validateMiddleware");

const router = express.Router();

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getBooks);
router.post("/", upload.single("coverImage"), validateBook, addBook);
router.put("/:id", upload.single("coverImage"), validateBook, updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
