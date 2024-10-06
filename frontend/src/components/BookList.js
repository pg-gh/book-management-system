import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../redux/actions/booksActions";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Pagination,
  Box,
  CardActions,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DIR_PATH = "http://localhost:5000";

const Filters = React.memo(
  ({ filters, handleFilterChange, dateRange, setDateRange }) => {
    return (
      <>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Filter Books
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 3,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            name="title"
            label="Title"
            value={filters.title}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: "250px" }}
          />
          <TextField
            name="author"
            label="Author"
            value={filters.author}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: "250px" }}
          />
          <TextField
            name="genre"
            label="Genre"
            value={filters.genre}
            onChange={handleFilterChange}
            sx={{ flex: 1, minWidth: "250px" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} sx={{ flex: 1 }} />
                  <TextField {...endProps} sx={{ flex: 1 }} />
                </>
              )}
            />
          </LocalizationProvider>
        </Box>
      </>
    );
  }
);

const Sort = React.memo(({ sort, handleSortChange }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Sort Books
      </Typography>
      <Select
        value={sort}
        onChange={handleSortChange}
        sx={{
          width: "250px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="author">Author</MenuItem>
        <MenuItem value="publicationDate">Publication Date</MenuItem>
      </Select>
    </Box>
  );
});

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, totalPages } = useSelector((state) => state);
  const navigate = useNavigate();

  const [filters, dispatchFilter] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_FILTER":
          return { ...state, [action.name]: action.value };
        case "RESET_FILTERS":
          return {
            title: "",
            author: "",
            genre: "",
            startDate: "",
            endDate: "",
          };
        default:
          return state;
      }
    },
    { title: "", author: "", genre: "", startDate: "", endDate: "" }
  );

  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);

  const debouncedFetchBooks = useMemo(
    () =>
      _.debounce((page, filters, sort, dateRange) => {
        const [startDate, endDate] = dateRange || [];
        dispatch(fetchBooks(page, { ...filters, startDate, endDate }, sort));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchBooks(page, filters, sort, dateRange);
    return () => {
      debouncedFetchBooks.cancel();
    };
  }, [debouncedFetchBooks, page, filters, sort, dateRange]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatchFilter({ type: "SET_FILTER", name, value });
  }, []);

  const handleSortChange = useCallback((e) => {
    setSort(e.target.value);
  }, []);

  const handlePageChange = useCallback((e, value) => {
    setPage(value);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      navigate(`/books/edit/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this book?")) {
        dispatch(deleteBook(id));
      }
    },
    [dispatch]
  );

  const handleAddNewBook = useCallback(() => {
    navigate("/books/new");
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Book List
      </Typography>

      <Filters
        filters={filters}
        handleFilterChange={handleFilterChange}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <Sort sort={sort} handleSortChange={handleSortChange} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddNewBook}
          sx={{
            backgroundColor: "#1976d2",
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          Add New Book
        </Button>
      </Box>

      {books.length > 0 ? (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {book.genre}
                  </Typography>
                  <img
                    src={`${DIR_PATH}/${book.coverImage}`}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      marginTop: "12px",
                    }}
                    loading="lazy"
                  />
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(book._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(book._id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ color: "gray", textAlign: "center" }}>
          No books found
        </Typography>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default BookList;
