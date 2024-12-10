import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from '../../../shared/services/film.service';
import {CollectionItemType} from '../../../types/collection-item.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CollectionEnum} from '../../../enums/collection.enum';
import {catchError, map, Observable, Subject, takeUntil, throwError} from 'rxjs';
import {ErrorResponseType} from '../../../types/error-response.type';
import {CollectionType} from '../../../types/collection.type';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-film-collections',
  templateUrl: './film-collections.component.html',
  styleUrl: './film-collections.component.scss'
})
export class FilmCollectionsComponent implements OnInit, OnDestroy {
  private filmService: FilmService = inject(FilmService);
  public totalPages: number = 0;
  public filmsTop250: {title: string, items: CollectionItemType[]} = {title: '', items: []};
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private destroy$: Subject<void> = new Subject();

  constructor() {

  }

  ngOnInit() {
    this.loadSlicedFilmCollection(CollectionEnum.TOP250MOVIES, 'топ 250 фильмов')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=> {
        this.filmsTop250 = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Подписываемся на получение коллекции. Передаем тип коллекции,
   * которую хотим получить (возможные варианты перечислены в CollectionEnum. Также передаем заголовок для отображения этой коллекции.
   * Результат функции можно сразу присвоить в переменную */
  loadSlicedFilmCollection(collection: CollectionEnum, title: string): Observable<{title: string, items: CollectionItemType[]}> {
    return this.filmService.getFilmsCollection(collection).pipe(
      takeUntil(this.destroy$),
      map((data: CollectionType | ErrorResponseType) => {
        if ((data as ErrorResponseType).message) {
          this._snackBar.open((data as ErrorResponseType).message);
          throw new Error((data as ErrorResponseType).message);
        }
        // Возвращаем коллекцию с заголовком и первые 4 фильма, полная версия будет на отдельной странице
        return {
          title: title,
          items: (data as CollectionType).items.slice(0, 4)
        }
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        // Обработка ошибок
        if (errorResponse.error && errorResponse.error.message) {
          this._snackBar.open(errorResponse.error.message);
        } else {
          this._snackBar.open('Ошибка получения данных');
        }
        return throwError(() => new Error('Ошибка получения данных'));
      })
    )
  };


  trackById(index: number, item: CollectionItemType): number {
    return item.kinopoiskId;
  }
}
