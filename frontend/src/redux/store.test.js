import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/booksReducer";

describe("Redux Store", () => {
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(rootReducer, applyMiddleware(thunk));
  });

  it("should initialize with the correct state", () => {
    const initialState = reduxStore.getState();
    expect(initialState.books).toEqual([]);
  });

  it("should handle actions", () => {
    const action = {
      type: "ADD_BOOK_SUCCESS",
      payload: { title: "New Book", author: "Author Name" },
    };

    reduxStore.dispatch(action);
    const updatedState = reduxStore.getState();

    expect(updatedState.books).toContainEqual(action.payload);
  });
});
