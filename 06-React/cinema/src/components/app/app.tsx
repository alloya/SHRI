'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setMoviesStore } from "@/redux/features/movies";
import { useGetMoviesQuery } from "@/redux/services/movieApi";
import { useEffect, useMemo, useState } from "react";
import { MovieList } from "../movie-list/movie-list"
import { SideBar } from "../side-bar/side-bar"
import { useRouter } from "next/router";
import { IMovieApi } from "@/models/film.model";
import { useSearchParams } from "next/navigation";


export const App = () => {

  //const router = useRouter()

  const dispatch = useAppDispatch();
  const store = useAppSelector(store => store.movies);
  const { data, isLoading, error } = useGetMoviesQuery(undefined, { skip: store.loaded });
  const [movies, setMovies] = useState<IMovieApi[]>([])
  const params = useSearchParams();
  const releaseYear = params.get('releaseYear');
  const genre = params.get('genre');
  const director = params.get('director');


  const filterMovies = () => {

  }

  const filter = useMemo(() => filterMovies(), [])

  useEffect(() => {
    if (data) {
      dispatch(setMoviesStore(data))
    }
  }, [data, dispatch, store.movies]);

  useEffect(() => {
    setMovies(store.movies || data)
  }, [store.movies, data])

  return <>
    <SideBar callback={() => {}} />
    {isLoading && <>Загружаем фильмы...</>}
    <MovieList movies={movies}/>
  </>
}
