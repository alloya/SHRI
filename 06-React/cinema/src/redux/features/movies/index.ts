import { IMovie, IMovieApi } from "@/models/film.model";
import { genres } from "@/utils/enum";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IMovieApi[] = [];

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesStore: (state, { payload }: { payload: IMovieApi[] }) => {
      return [...state, ...payload]
    },
    addMovieToStore: (state, { payload }: { payload: IMovieApi }) => {
      state.push(payload);
    }
    // getMovie: (state, { payload }: { payload: string }) => {
    //   const movie = state.find(el => el.id === payload);
    //   if (!movie) return;
    //   return movie
    // }
  }
})

export default moviesSlice.reducer;
export const { setMoviesStore, addMovieToStore } = moviesSlice.actions;