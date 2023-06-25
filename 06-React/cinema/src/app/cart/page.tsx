'use client'

import { FilmCard } from "@/components/film-card/film-card";
import { useAppSelector } from "@/hooks/hooks"
import { IMovieApi } from "@/models/film.model";
import st from "../../utils/styles.module.css";
import classNames from "classnames";


export default function Cart() {

  const cart = useAppSelector(state => state.cart);
  const movies = useAppSelector(state => state.movies);
  let products: IMovieApi[] = [];

  const count = Object.keys(cart).reduce((acc, curr) => {
    return acc + cart[curr];
  }, 0);

  const cartItems = Object.entries(cart);
  cartItems.forEach(el => {
    const movie = movies.find(movie => movie.id === el[0])
    movie && products.push(movie)
  })

  return (
    <div className={classNames(st.wrapper, st.page, st.d_flex_column, st.justify_between)}>
      {products && products.map(el =>
        <FilmCard {...el} key={el.id} cart={true} />
      )}
      <div className={classNames(st.wrapper, st.justify_between)}>
        <p className={st.text_bold}>Итого билетов:</p>
        <span>{count}</span>
      </div>
    </div>
  )
}