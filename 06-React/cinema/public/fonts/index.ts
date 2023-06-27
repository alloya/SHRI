import { Inter, Roboto, Roboto_Mono } from 'next/font/google';

export const roboto_mono = Roboto_Mono({
  variable: '--var-roboto-mono',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700']
})

export const roboto = Roboto({
  variable: '--var-roboto',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700']
})