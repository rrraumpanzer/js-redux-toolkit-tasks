import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice.js";
import commentsReducer from "./commentsSlice.js";
import usersReducer from "./usersSlice.js";

// BEGIN (write your solution here)
const store = configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      users: usersReducer,
    },
  });
export default store;
// END
