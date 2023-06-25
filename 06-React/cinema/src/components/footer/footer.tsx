import Link from 'next/link';
import s from './footer.module.css';

export const Footer = () => {

  return <footer className={s.footer}>
    <Link href={'/faq'}>Вопросы-ответы</Link>
    <Link href={'/about-us'}>О нас</Link>
  </footer>
}