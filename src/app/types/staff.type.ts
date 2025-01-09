export type StaffType = {
  personId: number,
  webUrl: string,
  nameRu: string,
  nameEn: string,
  sex: string,
  posterUrl: string,
  growth: number,
  birthday: string,
  death: string,
  age: number,
  birthplace: string,
  deathplace: string,
  hasAwards: number,
  profession: string,
  facts: [
    string
  ],
  spouses: [
    {
      personId: number,
      name: string,
      divorced: boolean,
      divorcedReason: string,
      sex: string,
      children: number,
      webUrl: string,
      relation: string
    }
  ],
  films: [
    {
      filmId: number,
      nameRu: string,
      nameEn: string,
      rating: string
      general: boolean,
      description: string,
      professionKey: string
    }
  ]
}
