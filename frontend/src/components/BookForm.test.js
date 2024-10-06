import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import BookForm from "./BookForm";
import { useParams } from "react-router-dom";

jest.mock("../redux/actions/booksActions");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("BookForm Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      books: [
        {
          _id: "1",
          title: "Sample Book",
          author: "Sample Author",
          genre: "Fiction",
        },
      ],
    });

    useParams.mockReturnValue({});
  });

  it("should render Add New Book form if no book ID is provided", () => {
    render(
      <Provider store={store}>
        <Router>
          <BookForm />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /author/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /genre/i })).toBeInTheDocument();
  });

  it("should render Edit Book form if a book ID is provided", () => {
    useParams.mockReturnValue({ id: "1" });
    render(
      <Provider store={store}>
        <Router>
          <BookForm />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample Author")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Fiction")).toBeInTheDocument();
  });

  it("should handle file upload", () => {
    render(
      <Provider store={store}>
        <Router>
          <BookForm />
        </Router>
      </Provider>
    );

    const fileInput = screen.getByLabelText("Upload Cover Image");
    const file = new File(["cover"], "cover.jpg", { type: "image/jpeg" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });
});
