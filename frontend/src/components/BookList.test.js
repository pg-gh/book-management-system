import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import BookList from "../components/BookList";
import { fetchBooks, deleteBook } from "../redux/actions/booksActions";
import { MemoryRouter } from "react-router-dom";

jest.mock("../redux/actions/booksActions", () => ({
  fetchBooks: jest.fn(),
  deleteBook: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([thunk]);

describe("BookList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      books: [
        {
          _id: "1",
          title: "Book 1",
          author: "Author 1",
          genre: "Genre 1",
          coverImage: "book1.jpg",
        },
      ],
      loading: false,
      totalPages: 2,
    });
    store.dispatch = jest.fn();
    fetchBooks.mockClear();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Book List")).toBeInTheDocument();
  });

  it("displays a loading message when loading is true", () => {
    store = mockStore({
      books: [],
      loading: true,
      totalPages: 0,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays no books message when no books are found", () => {
    store = mockStore({
      books: [],
      loading: false,
      totalPages: 0,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("No books found")).toBeInTheDocument();
  });

  it("handles filter changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const titleFilter = screen.getByLabelText("Title");
    fireEvent.change(titleFilter, { target: { value: "New Title" } });

    expect(titleFilter.value).toBe("New Title");
  });

  it("handles sort changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const sortSelect = screen.getByLabelText("Title");
    fireEvent.mouseDown(sortSelect);

    const authorOption = screen.getByLabelText("Author");
    fireEvent.click(authorOption);

    expect(screen.getByLabelText("Author")).toBeInTheDocument();
  });

  it("navigates to edit page when edit button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const editButton = screen.getByTestId("EditIcon");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("/books/edit/1");
  });

  it("calls deleteBook action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByTestId("DeleteIcon");
    window.confirm = jest.fn(() => true);
    fireEvent.click(deleteButton);

    expect(deleteBook).toHaveBeenCalledWith("1");
  });

  it("calls navigate to add new book page when 'Add New Book' is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const addButton = screen.getByText("Add New Book");
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("/books/new");
  });
});
