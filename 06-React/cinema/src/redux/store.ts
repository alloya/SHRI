import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cardReducer from "./features/cart";
import moviesReducer from "./features/movies";
import { movieApi } from "./services/movieApi";

const store = configureStore({
  reducer: {
    cart: cardReducer,
    movies: moviesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movieApi.middleware])
})
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch