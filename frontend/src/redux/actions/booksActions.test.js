import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchBooks, addBook, editBook, deleteBook } from "./booksActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

const API_URI = "http://localhost:5000/books";

describe("Book actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    mockAxios.reset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches FETCH_BOOKS_SUCCESS when fetching books is successful", async () => {
    const mockData = {
      books: [{ id: 1, title: "Test Book", author: "Author" }],
    };
    mockAxios.onGet(API_URI).reply(200, mockData);

    const expectedActions = [
      { type: "FETCH_BOOKS_REQUEST" },
      { type: "FETCH_BOOKS_SUCCESS", payload: mockData },
    ];

    await store.dispatch(fetchBooks(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches FETCH_BOOKS_FAILURE when fetching books fails", async () => {
    const errorMessage = "Network Error";
    mockAxios.onGet(API_URI).networkError();

    const expectedActions = [
      { type: "FETCH_BOOKS_REQUEST" },
      { type: "FETCH_BOOKS_FAILURE", payload: errorMessage },
    ];

    await store.dispatch(fetchBooks(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches ADD_BOOK_SUCCESS when adding a book is successful", async () => {
    const mockBook = { id: 1, title: "New Book", author: "Author Name" };
    mockAxios.onPost(API_URI).reply(200, { book: mockBook });

    const expectedActions = [{ type: "ADD_BOOK_SUCCESS", payload: mockBook }];

    await store.dispatch(addBook(mockBook));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches EDIT_BOOK_SUCCESS when editing a book is successful", async () => {
    const mockBook = { id: 1, title: "Updated Book", author: "Author Name" };
    mockAxios.onPut(`${API_URI}/1`).reply(200, { book: mockBook });

    const expectedActions = [{ type: "EDIT_BOOK_SUCCESS", payload: mockBook }];

    await store.dispatch(editBook(1, mockBook));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("dispatches DELETE_BOOK_SUCCESS when deleting a book is successful", async () => {
    mockAxios.onDelete(`${API_URI}/1`).reply(200);

    const expectedActions = [{ type: "DELETE_BOOK_SUCCESS", payload: 1 }];

    await store.dispatch(deleteBook(1));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
