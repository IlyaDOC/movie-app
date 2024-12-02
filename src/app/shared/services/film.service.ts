import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CollectionType} from '../../types/collection.type';
import {config} from '../../utils/config';
import {ErrorResponseType} from '../../types/error-response.type';
import {FilmType} from '../../types/film.type';
import {BoxOfficeType} from '../../types/box-office.type';
import {FactsType} from '../../types/facts.type';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }


  /** Получаем коллекцию фильмов по заданным query параметрам.
   * Возвращает список фильмов с пагинацией. Каждая страница содержит не более чем 20 фильмов. */
  getFilmsCollection(type: string, page: string = '1'): Observable<CollectionType | ErrorResponseType> {
    return this.http.get<CollectionType | ErrorResponseType>(config.api + 'v2.2/films/collections', {
      params: {
        type: type,
        page: page
      }
    });
  };

  /** Получаем данные по одному фильму, получая id из query параметров */
  getFilm(id: string): Observable<FilmType | ErrorResponseType>{
    return this.http.get<FilmType | ErrorResponseType>(config.api + 'v2.2/films/' + id);
  };


  /** Получаем данные о бюджете с сборах фильма */
  getBoxOffice(filmId: string): Observable<BoxOfficeType | ErrorResponseType> {
    return this.http.get<BoxOfficeType | ErrorResponseType>(config.api + 'v2.2/films/' + filmId + '/box_office');
  }


  /** Получаем данные об интересных фактах и ляпах в фильме */
  getFacts(filmId: string): Observable<FactsType | ErrorResponseType> {
    return this.http.get<FactsType | ErrorResponseType>(config.api + 'v2.2/films/' + filmId +' /facts');
  }
}
