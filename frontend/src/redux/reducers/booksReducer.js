const initialState = {
  books: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case "FETCH_BOOKS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_BOOK_SUCCESS":
      return { ...state, books: [...state.books, action.payload] };
    case "EDIT_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case "DELETE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    default:
      return state;
  }
};

export default booksReducer;
