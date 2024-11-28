import {Component, Input} from '@angular/core';
import {CollectionItemType} from '../../../types/collection-item.type';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent {
  @Input() film: CollectionItemType;

  constructor() {
    this.film = {
      kinopoiskId: 0,
      imdbId: '',
      nameRu: '',
      nameEn: null,
      nameOriginal: '',
      countries: [
        {
          country: ''
        }
      ],
      genres: [
        {
          genre: ''
        },
        {
          genre: ''
        }
      ],
      ratingKinopoisk: 0,
      ratingImdb: 0,
      year: 0,
      type: '',
      posterUrl: '',
      posterUrlPreview: '',
      coverUrl: '',
      logoUrl: '',
      description: '',
      ratingAgeLimits: ''
    }
  }
}