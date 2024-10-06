import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, editBook } from "../redux/actions/booksActions";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

const BookForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state);
  const existingBook = id ? books.find((book) => book._id === id) : {};

  const [formData, setFormData] = useState({
    title: existingBook?.title || "",
    author: existingBook?.author || "",
    genre: existingBook?.genre || "",
    coverImage: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    if (formData.coverImage) data.append("coverImage", formData.coverImage);

    if (id) {
      dispatch(editBook(id, data));
    } else {
      dispatch(addBook(data));
    }

    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? "Edit Book" : "Add New Book"}
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload Cover Image
                <input
                  type="file"
                  hidden
                  name="coverImage"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default BookForm;
