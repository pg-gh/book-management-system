import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/edit/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
