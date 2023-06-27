import s from "./movie-list.module.css";
import { FilmCard } from "../film-card/film-card";
import { IMovieApi } from "@/models/film.model";

export const MovieList = ({movies}: {movies: IMovieApi[]}) => {

  return (
    <section className={s.content}>
      {movies.map(el => <FilmCard {...el} key={el.id} />)}
    </section>
  )
}