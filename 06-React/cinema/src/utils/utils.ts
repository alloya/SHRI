import { IFIlter } from "@/models/filter.model";
import { TGenreKeys, genres } from "./enum"
import { ICinema } from "@/models/cinema.model";

export const mapGenre = (genre: TGenreKeys) => {
  return genres[genre] || genre.toString();
}

export const getGenresFilter = (genre: {[key: string]: string}) => {
  const result: IFIlter[] = [{key: '', value: null}];
  Object.keys(genre).forEach(el => {
    result.push({key: el, value: mapGenre(el)})
  })
  return result;
}

export const getCinemaFilter = (cinemas: ICinema[]) => {
  const result: IFIlter[] = [{key: '', value: null}];
  cinemas.forEach(el => result.push({key: el.id, value:el.name}))
  return result;
}