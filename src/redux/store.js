import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoReducer";

const store = configureStore({
  reducer: {
    todoReducer,
  },
});

export default store;
