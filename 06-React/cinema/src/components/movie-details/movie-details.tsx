import { IMovieApi } from "@/models/film.model";
import s from "./movie-details.module.css";
import st from "../../utils/styles.module.css";
import Image from 'next/image';
import { TicketCounter } from "../ticket-counter/ticket-counter";
import { mapGenre } from "@/utils/utils";
import { useGetReviewsForMovieQuery } from "@/redux/services/movieApi";
import { Comment } from "../comment/comment";
import classNames from "classnames";

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
          <div className={classNames(st.d_flex, st.justify_between, st.align_center, st.pb_4)}>
            <h1 className={classNames(st.text_big, st.text_bold)}>{title}</h1>
            <TicketCounter id={id} cart={false} />
          </div>
          <div className={classNames(st.flex_column, st.pb_3)}>
            <InfoLine name='Жанр' value={mapGenre(genre)} />
            <InfoLine name='Год выпуска' value={releaseYear} />
            <InfoLine name='Рейтинг' value={rating} />
            <InfoLine name='Режиссер' value={director} />
          </div>
          <div>
            <p className={classNames(st.text_normal, st.text_bold, st.mb_3)}>Описание:</p>
            <p className={st.text_small}>{description}</p>
          </div>
        </div>
      </div>
      {isLoading && <p>Загружаются отзывы</p>}
      <div className={s.comments}>
        {data && data.map(el => <Comment key={el.id} comment={el} />)}
      </div>
    </>

  )
}

const InfoLine = ({name, value}: {name: string, value: string | number}) => {
  return (
    <div className={st.pb_3}>
      <span className={classNames(st.text_normal, st.text_bold, st.pr_2)}>{name}:</span>
      <span className={st.text_normal}>{value}</span>
    </div>
  )
}