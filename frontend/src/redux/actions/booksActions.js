import axios from "axios";

const API_URI = "http://localhost:5000/books";

export const fetchBooks =
  (page, filters = {}, sortBy = "title") =>
  async (dispatch) => {
    dispatch({ type: "FETCH_BOOKS_REQUEST" });
    try {
      const response = await axios.get(API_URI, {
        params: { page, ...filters, sortBy },
      });
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_BOOKS_FAILURE", payload: error.message });
    }
  };

export const addBook = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(API_URI, formData);
    dispatch({ type: "ADD_BOOK_SUCCESS", payload: response.data.book });
  } catch (error) {
    console.error(error);
  }
};

export const editBook = (id, formData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URI}/${id}`, formData);
    dispatch({ type: "EDIT_BOOK_SUCCESS", payload: response.data.book });
  } catch (error) {
    console.error(error);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URI}/${id}`);
    dispatch({ type: "DELETE_BOOK_SUCCESS", payload: id });
  } catch (error) {
    console.error(error);
  }
};
