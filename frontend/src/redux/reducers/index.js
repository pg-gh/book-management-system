import { combineReducers } from "redux";
import booksReducer from "./booksReducer";

const rootReducer = combineReducers({
  booksState: booksReducer,
});

export default rootReducer;
