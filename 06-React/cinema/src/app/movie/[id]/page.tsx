'use client'

import { MovieDetails } from "@/components/movie-details/movie-details";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { selectMovie } from "@/redux/features/movies/selector";
import { useGetMovieByIdQuery } from "@/redux/services/movieApi";
import st from "../../../utils/styles.module.css";
import { useEffect } from "react";
import { addMovieToStore } from "@/redux/features/movies";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const movie = useAppSelector(state => selectMovie(state, params.id));
  const { data, isLoading, error } = useGetMovieByIdQuery(params.id, { skip: Boolean(movie) })

  useEffect(() => {
    if (data) {
      dispatch(addMovieToStore(data));
    }
  }, [dispatch, data]);

  if (!(!!movie || !!data)) return null;

  return (
    <div className={st.page}>
      {(movie || data) && <MovieDetails movie={movie || data!} />}
    </div>
  )
}