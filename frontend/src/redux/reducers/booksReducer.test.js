import booksReducer from "./booksReducer";

describe("Books Reducer", () => {
  const initialState = {
    books: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  };

  it("should return the initial state", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const state = booksReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it("should handle FETCH_BOOKS_REQUEST", () => {
    const action = { type: "FETCH_BOOKS_REQUEST" };
    const expectedState = { ...initialState, loading: true };

    const state = booksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle FETCH_BOOKS_SUCCESS", () => {
    const action = {
      type: "FETCH_BOOKS_SUCCESS",
      payload: {
        books: [
          { _id: 1, title: "Book 1" },
          { _id: 2, title: "Book 2" },
        ],
        totalPages: 5,
        currentPage: 2,
      },
    };

    const expectedState = {
      ...initialState,
      loading: false,
      books: action.payload.books,
      totalPages: action.payload.totalPages,
      currentPage: action.payload.currentPage,
    };

    const state = booksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle FETCH_BOOKS_FAILURE", () => {
    const action = {
      type: "FETCH_BOOKS_FAILURE",
      payload: "Error fetching books",
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: "Error fetching books",
    };

    const state = booksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle ADD_BOOK_SUCCESS", () => {
    const action = {
      type: "ADD_BOOK_SUCCESS",
      payload: { _id: 3, title: "New Book" },
    };

    const expectedState = {
      ...initialState,
      books: [...initialState.books, action.payload],
    };

    const state = booksReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle EDIT_BOOK_SUCCESS", () => {
    const action = {
      type: "EDIT_BOOK_SUCCESS",
      payload: { _id: 2, title: "Updated Book" },
    };

    const currentState = {
      ...initialState,
      books: [
        { _id: 1, title: "Book 1" },
        { _id: 2, title: "Book 2" },
      ],
    };

    const expectedState = {
      ...initialState,
      books: [
        { _id: 1, title: "Book 1" },
        { _id: 2, title: "Updated Book" },
      ],
    };

    const state = booksReducer(currentState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle DELETE_BOOK_SUCCESS", () => {
    const action = { type: "DELETE_BOOK_SUCCESS", payload: 2 };

    const currentState = {
      ...initialState,
      books: [
        { _id: 1, title: "Book 1" },
        { _id: 2, title: "Book 2" },
      ],
    };

    const expectedState = {
      ...initialState,
      books: [{ _id: 1, title: "Book 1" }],
    };

    const state = booksReducer(currentState, action);
    expect(state).toEqual(expectedState);
  });
});
