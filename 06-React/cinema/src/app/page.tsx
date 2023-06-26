'use client'

import { SideBar } from '@/components/side-bar/side-bar';
import s from './page.module.css'
import { MovieList } from '@/components/movie-list/movie-list';
import { App } from '@/components/app/app';


export default function Home() {

  return <main className={s.main}>
    <App />
  </main>
}
