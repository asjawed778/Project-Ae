// import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './slices/authSlice';
// import loadingSlice from './slices/loadingSlice';
// import postSlice from './slices/postSlice';
// import commentSlice  from './slices/commentSlice';

// export const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         posts:postSlice ,
//         comments:commentSlice ,
//         loading: loadingSlice
//     }
// })

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use sessionStorage if you prefer session-level persistence
import authSlice from './slices/authSlice';
import loadingSlice from './slices/loadingSlice';
import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';
import categorySlice  from './slices/adminCategorySlice';
import { combineReducers } from 'redux';
import userPostSlice from './slices/userPostSlice';
import courseSlice from './slices/coursesSlice';

// Create a persist configuration
const persistConfig = {
  key: 'root', // key for storage (can be changed)
  storage, // Use localStorage to persist data
  whitelist: ['auth'] // Only persist the 'auth' slice (you can add more slices if needed)
};

// Combine all the reducers
const rootReducer = combineReducers({
  auth: authSlice,
  posts: postSlice,
  userposts: userPostSlice ,
  comments: commentSlice,
  categories: categorySlice ,
  courses:courseSlice ,
  loading: loadingSlice
});

// Create a persisted reducer using the persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Export the persisted store
export const persistor = persistStore(store);
