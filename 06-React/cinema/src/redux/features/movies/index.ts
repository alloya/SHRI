import { IMovieApi } from "@/models/film.model";
import { createSlice } from "@reduxjs/toolkit";
type MovieStore = {
  loaded: boolean,
  movies: IMovieApi[]
}

const initialState: MovieStore = {
  loaded: false,
  movies: []
}

const initialState2: IMovieApi[] = [];

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesStore: (state, { payload }: { payload: IMovieApi[] }) => {
      state = {...state, loaded: true, movies: [...payload]}
      return state;
    },
    addMovieToStore: (state, { payload }: { payload: IMovieApi }) => {
      state.movies.push(payload);
    }
  }
})

export default moviesSlice.reducer;
export const { setMoviesStore, addMovieToStore } = moviesSlice.actions;