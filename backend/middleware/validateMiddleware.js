exports.validateBook = (req, res, next) => {
  const { title, author, genre } = req.body;
  if (!title || !author || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};
