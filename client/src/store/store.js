import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use sessionStorage if needed

// Importing Reducers
import adminCategoryReducer from "./reducers/adminCategoryReducer";
import authReducer from "./reducers/authReducer";
// import commentReducer from "./reducers/commentReducer";
import coursesReducer from "./reducers/coursesReducer";
// import postReducer from "./reducers/postReducer";
// import userPostReducer from "./reducers/userPostReducer";

// Importing Apis
import { apiAuth } from "../services/auth.api";
import { apiComment } from "../services/comment.api";
import { apiCourse } from "../services/course.api";
import { apiPost } from "../services/post.api";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth slice
};

// Combine all the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // posts: postReducer,
  // userposts: userPostReducer,
  // comments: commentReducer,
  categories: adminCategoryReducer,
  courses: coursesReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  // [apiComment.reducerPath]: apiComment.reducer,
  [apiCourse.reducerPath]: apiCourse.reducer,
  // [apiPost.reducerPath]: apiPost.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      apiAuth.middleware,
      // apiComment.middleware,
      apiCourse.middleware,
      // apiPost.middleware
    ),
});

// Create the persisted store
export const persistor = persistStore(store);
