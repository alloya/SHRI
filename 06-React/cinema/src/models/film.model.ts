import { TGenreKeys, TGenreValues } from "@/utils/enum";

export interface IMovie {
  title: string,
  posterUrl: string,
  releaseYear: number,
  description: string,
  genre: TGenreValues,
  id: string,
  rating: number,
  director: string,
  reviewIds: string[],
}

export interface IMovieApi {
  title: string,
  posterUrl: string,
  releaseYear: number,
  description: string,
  genre: TGenreKeys,
  id: string,
  rating: number,
  director: string,
  reviewIds: string[],
}