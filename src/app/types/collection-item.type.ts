export type CollectionItemType = {
  kinopoiskId: number,
  imdbId: string,
  nameRu: string,
  nameEn: null | string,
  nameOriginal: string,
  countries: [
    {
      country: string
    }
  ],
  genres: [
    {
      genre: string
    },
    {
      genre: string
    }
  ],
  ratingKinopoisk: number,
  ratingImdb: number,
  year: number,
  type: string,
  posterUrl: string,
  posterUrlPreview: string,
  coverUrl: string,
  logoUrl: string,
  description: string,
  ratingAgeLimits: string
}
