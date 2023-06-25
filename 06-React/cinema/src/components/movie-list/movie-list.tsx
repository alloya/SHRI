'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setMoviesStore } from "@/redux/features/movies";
import { useGetMoviesQuery } from "@/redux/services/movieApi"
import { useEffect } from "react";
import s from "./movie-list.module.css";
import { FilmCard } from "../film-card/film-card";

export const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(store => store.movies);
  const { data, isLoading, error } = useGetMoviesQuery(undefined, { skip: movies.length !== 0 });

  useEffect(() => {
    if (data && !movies.length) {
      dispatch(setMoviesStore(data))
    }
  }, [data, dispatch, movies])

  return (
    <section className={s.content}>
      {movies.map(el => <FilmCard {...el} key={el.id} />)}
    </section>
  )
}