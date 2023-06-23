import s from './header.module.css';
import Image from 'next/image';


export const Header = () => {
  return <div className={s.header}>
    <h1 className={s.title}>Билетопоиск</h1>
    <span className={s.cart} />
  </div>
}