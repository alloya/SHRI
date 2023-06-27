import { ICinema } from '@/models/cinema.model';
import { IMovieApi } from '@/models/film.model';
import { IReview } from '@/models/rewiew.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<IMovieApi[], string | void>({
      query: (cinemaId) => {
        if (cinemaId) {
          return `movies?cinemaId=${cinemaId}`
        }
        return `movies`
      }
    }),
    getMovieById: builder.query<IMovieApi, string>({ query: (movieId) => `movie?movieId=${movieId}` }),
    getReviewsForMovie: builder.query<IReview[], string>({ query: (movieId) => `reviews?movieId=${movieId}` }),
    getCinemas: builder.query<ICinema[], void>({ query: () => 'cinemas' })
  })
})

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetReviewsForMovieQuery, useGetCinemasQuery } = movieApi;