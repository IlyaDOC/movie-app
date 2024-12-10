import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FilmStaffType} from '../../types/film-staff.type';
import {ErrorResponseType} from '../../types/error-response.type';
import {config} from '../../utils/config';
import {HttpClient} from '@angular/common/http';
import {StaffType} from '../../types/staff.type';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  /** Получаем данных об актерах, режиссерах и т.д */
  getFilmStaff(filmId: string): Observable<FilmStaffType[] | ErrorResponseType> {
    return this.http.get<FilmStaffType[] | ErrorResponseType>(config.api + 'v1/staff', {
      params: {
        filmId: filmId,
      }
    })
  };

  /** Получаем всю информацию об актере */
  getStaffInfo(staffId: string): Observable<StaffType | ErrorResponseType> {
    return this.http.get<StaffType | ErrorResponseType>(config.api + 'v1/staff/' + staffId)
  };

}
