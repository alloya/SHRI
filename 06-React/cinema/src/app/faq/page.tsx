'use client'

import { Accordeon } from "@/components/accordeon/accordeon";
import st from "../../utils/styles.module.css";
import s from "./page.module.css";
import classNames from "classnames";

export default function Faq() {

  return (
    <div className={classNames(st.page, st.d_flex_column, s.gap)}>
      {fq.map((el, i) => <Accordeon {...el} key={i} />)}
      
    </div>
  )

}

const fq = [
  {question: "Что такое Билетопоиск?", answer: 'Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.'},
  {question: "Какой компании принадлежит Билетопоиск?", answer: 'Кажется, Яндексу'},
  {question: "Как купить билет на Билетопоиск?", answer: 'Накидать билетов в корзину и ждать, пока мы сделаем покупку!'},
  {question: "Как оставить отзыв на Билетопоиск?", answer: 'Никак. Всё куплено.'},
]