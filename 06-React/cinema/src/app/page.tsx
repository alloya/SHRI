import Image from 'next/image'
import s from './page.module.css'
import { FilmCard } from '@/components/film-card/film-card'
import { movies } from '../mocks/mock';

export default function Home() {
  return <div className={s.main}>
    <section className={s.side_bar}>
      
    </section>
    <section className={s.content}>
      {movies.map(el => <FilmCard {...el} key={el.id}/>)}
    </section>
  </div>
}
