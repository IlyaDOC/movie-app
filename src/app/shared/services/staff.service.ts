import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StaffType} from '../../types/staff.type';
import {ErrorResponseType} from '../../types/error-response.type';
import {config} from '../../utils/config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  /** Получаем данных об актерах, режиссерах и т.д */
  getStaff(filmId: string): Observable<StaffType[] | ErrorResponseType> {
    return this.http.get<StaffType[] | ErrorResponseType>(config.api + 'v1/staff', {
      params: {
        filmId: filmId,
      }
    })
  };
}
