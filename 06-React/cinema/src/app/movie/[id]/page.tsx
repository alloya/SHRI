'use client'

import { MovieDetails } from "@/components/movie-details/movie-details";
import { useAppSelector } from "@/hooks/hooks";
import { selectMovie } from "@/redux/features/movies/selector";
import { useGetMovieByIdQuery } from "@/redux/services/movieApi";

export default function Page({ params }: { params: { id: string } }) {
  const movie = useAppSelector(state => selectMovie(state, params.id));
  const { data, isLoading, error } = useGetMovieByIdQuery(params.id, { skip: Boolean(movie) })

  if (!(!!movie || !!data)) return null;

  return (
    <div style={{padding: '24px', backgroundColor: '#F8F8F8'}}>
      {(movie || data) && <MovieDetails movie={movie || data!} />}
    </div>
  )
}