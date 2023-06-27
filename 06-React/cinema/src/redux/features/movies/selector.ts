import { RootState } from "@/redux/store";


export const selectMoviesModule = (state: RootState) => state.movies.movies;

export const selectMovie = (state: RootState, id: string) => selectMoviesModule(state).find(el => el.id === id) || null;