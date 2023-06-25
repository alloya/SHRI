import { TGenreKeys, genres } from "./enum"

export const mapGenre = (genre: TGenreKeys) => {
  return genres[genre] || genre;
}