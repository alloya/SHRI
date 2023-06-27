'use client'
import { useAppSelector } from '@/hooks/hooks';
import s from './header.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
  const pathName = usePathname();
  const cart = useAppSelector(store => store.cart);

  const count = Object.keys(cart).reduce((acc, curr) => {
    return acc + cart[curr];
  }, 0)

  return (
    <header className={s.header}>
      <Link href='/' className={s.title} >Билетопоиск</Link>
      {!!count && <button className={s.counter} >{count}</button>}
      <Link href='/cart' className={s.cart} />
    </header>
  )
}