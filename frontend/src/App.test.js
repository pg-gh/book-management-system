import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

// Mocking the components to simplify
jest.mock("./components/BookList", () => () => <div>BookList Component</div>);
jest.mock("./components/BookForm", () => () => <div>BookForm Component</div>);

describe("App Routing", () => {
  it("should render BookList component for the root route '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("BookList Component")).toBeInTheDocument();
  });

  it("should render BookForm component for the '/books/new' route", () => {
    render(
      <MemoryRouter initialEntries={["/books/new"]}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("BookForm Component")).toBeInTheDocument();
  });

  it("should render BookForm component for the '/books/edit/:id' route", () => {
    render(
      <MemoryRouter initialEntries={["/books/edit/1"]}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("BookForm Component")).toBeInTheDocument();
  });
});
