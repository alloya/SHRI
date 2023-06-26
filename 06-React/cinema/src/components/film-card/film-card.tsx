import { IMovieApi } from "@/models/film.model";
import s from "./film-card.module.css";
import st from "../../utils/styles.module.css";
import Image from 'next/image';
import { TicketCounter } from "../ticket-counter/ticket-counter";
import { mapGenre } from "@/utils/utils";
import Link from "next/link";
import classNames from "classnames";

interface pageState extends IMovieApi {
  cart?: boolean
}

export const FilmCard = (props: pageState) => {
  const { title, posterUrl,genre, id, cart} = props;
  return <div className={classNames(st.wrapper, st.d_flex)} key={id}>
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
        <Link href={{
          pathname: `/movie/${id}`
        }}
          className={classNames(st.text_normal, st.text_bold)}>
          {title}
        </Link>
        <p className={classNames(st.text_small, st.text_italic, st.mt_2)}>{mapGenre(genre)}</p>
      </div>
      <div>
        <TicketCounter id={id} cart={cart || false}/>
      </div>
    </div>
  </div >
}