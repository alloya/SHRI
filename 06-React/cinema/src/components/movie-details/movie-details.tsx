import { IMovieApi } from "@/models/film.model";
import s from "./movie-details.module.css";
import Image from 'next/image';
import { TicketCounter } from "../ticket-counter/ticket-counter";
import { mapGenre } from "@/utils/utils";
import { useGetReviewsForMovieQuery } from "@/redux/services/movieApi";
import { Comment } from "../comment/comment";

export const MovieDetails = ({ movie }: { movie: IMovieApi }) => {
  const { title, posterUrl, releaseYear, description, genre, id, rating, director, reviewIds } = movie;

  const { data, isLoading, error } = useGetReviewsForMovieQuery(id);

  return (
    <>
      <div className={s.wrapper}>
        <Image
          src={posterUrl}
          alt="Постер фильма"
          width={400}
          height={500}
          priority
          className={s.film_poster}
        />
        <div className={s.movie_info}>
          <div className={s.title_wrapper}>
            <h1 className={s.title}>{title}</h1>
            <TicketCounter id={id} cart={false} />
          </div>
          <div className={s.info}>
            <div className={s.line}>
              <span className={s.key}>Жанр:</span>
              <span className={s.value}>{mapGenre(genre)}</span>
            </div>
            <div className={s.line}>
              <span className={s.key}>Год выпуска:</span>
              <span className={s.value}>{releaseYear}</span>
            </div>
            <div className={s.line}>
              <span className={s.key}>Рейтинг:</span>
              <span className={s.value}>{rating}</span>
            </div>
            <div className={s.line}>
              <span className={s.key}>Режиссер:</span>
              <span className={s.value}>{director}</span>
            </div>
          </div>
          <div className={s.description} >
            <span className={s.key + ' ' + s.line}>Описание:</span>
            <p className={s.value}>{description}</p>
          </div>
        </div>
      </div>
      {isLoading && <p>Загружаются отзывы</p>}
      <div className={s.comments}>
        {data && data.map(el => <Comment key={el.id} comment={el}/>)}
      </div>
    </>

  )
}