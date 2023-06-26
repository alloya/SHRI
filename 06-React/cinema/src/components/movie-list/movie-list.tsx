'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setMoviesStore } from "@/redux/features/movies";
import { useGetMoviesQuery } from "@/redux/services/movieApi"
import { useEffect } from "react";
import s from "./movie-list.module.css";
import { FilmCard } from "../film-card/film-card";

export const MovieList = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(store => store.movies);
  const { data, isLoading, error } = useGetMoviesQuery(undefined, { skip: store.loaded });

  useEffect(() => {
    if (data) {
      dispatch(setMoviesStore(data))
    }
  }, [data, dispatch, store.movies])

  return (
    <section className={s.content}>
      {store.movies.map(el => <FilmCard {...el} key={el.id} />)}
    </section>
  )
}