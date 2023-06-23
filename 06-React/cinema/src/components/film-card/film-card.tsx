import { IFilmCard } from "@/models/filmCardModel";
import s from "./film-card.module.css";
import Image from 'next/image';
import { TicketCounter } from "../ticket-counter/ticket-counter";

export const FilmCard = (props: IFilmCard) => {
  const { title, posterUrl, releaseYear, description, genre, id, rating, director, reviewIds } = props;
  return <div className={s.card_wrapper}>
    <Image
      src={posterUrl}
      alt="Постер фильма"
      width={100}
      height={120}
      priority
      className={s.film_poster}
    />
    <div className={s.card_body}>
      <div className={s.card_info}>
        <p className={s.film_title}>{title}</p>
        <p className={s.film_genre}>{genre}</p>
      </div>
      <div>
        <TicketCounter id={id} />
      </div>
    </div>
  </div>
}