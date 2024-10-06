const Book = require("../models/Book");

// GET /books: Fetch all books with pagination, sorting, filtering
exports.getBooks = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
    title,
    author,
    genre,
    startDate,
    endDate,
  } = req.query;

  const filter = {};

  // Apply title, author, and genre filters
  if (title) filter.title = new RegExp(title, "i");
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  // Apply date range filtering for publication date
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }

  try {
    // Fetch books based on filter, sorting, pagination
    const books = await Book.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Calculate total books for pagination
    const total = await Book.countDocuments(filter);

    // Respond with books and pagination details
    res.status(200).json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

// POST /books: Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const coverImage = req.file ? req.file.path : null;

  try {
    const newBook = new Book({ title, author, genre, coverImage });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

// PUT /books/:id: Update book details
exports.updateBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const coverImage = req.file ? req.file.path : null;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        ...(coverImage && { coverImage }),
      },
      { new: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

// DELETE /books/:id: Remove a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
