'use client'

import { useAppDispatch, useAppSelector, useDebounce } from "@/hooks/hooks";
import { setMoviesStore } from "@/redux/features/movies";
import { useGetMoviesQuery } from "@/redux/services/movieApi";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { IMovieApi } from "@/models/film.model";
import { useSearchParams } from "next/navigation";
import { SideBar } from "@/components/side-bar/side-bar";
import { MovieList } from "@/components/movie-list/movie-list";
import s from "./page.module.css";

export default function Page() {

  const dispatch = useAppDispatch();
  const store = useAppSelector(store => store.movies);
  const { data, isLoading, error } = useGetMoviesQuery(undefined, { skip: store.loaded });
  const [movies, setMovies] = useState<IMovieApi[]>([]);

  const params = useSearchParams();
  const search = params.get('search');
  const genre = params.get('genre');
  const cinema = params.get('cinema');
  const filters = {
    search, genre, cinema
  }
  let cinemaMovies = useGetMoviesQuery(cinema!, { skip: !cinema });

  useEffect(() => {
    if (cinemaMovies.isLoading || isLoading) return;
    const filter = (params.toString().length>0&&cinemaMovies.data || store.movies)
      .filter(el => genre === null || el.genre === genre)
      .filter(el => search === null || el.title.toLowerCase().includes(search.toLowerCase()))
    setMovies(filter)
  }, [search, genre, cinemaMovies, store.movies, isLoading, params])

  useEffect(() => {
    if (data) {
      dispatch(setMoviesStore(data))
    }
  }, [data, dispatch, store.movies]);

  return <div className={s.main}>
    <SideBar {...filters} />
    {isLoading && <>Загружаем фильмы...</>}
    <MovieList movies={movies} />
  </div>
}
