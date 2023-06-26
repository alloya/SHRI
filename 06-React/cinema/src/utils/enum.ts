export const genres: {[key: string]: string} = {
  'action': 'Экшн',
  'fantasy': 'Фэнтези',
  'horror': 'Ужасы',
  'comedy': 'Комедия'
}

export type TGenreValues = typeof genres[keyof typeof genres];
export type TGenreKeys = keyof typeof genres;