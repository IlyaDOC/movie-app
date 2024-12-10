import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from '../../../shared/services/film.service';
import {CollectionItemType} from '../../../types/collection-item.type';
import {ActivatedRoute, Params} from '@angular/router';
import {CollectionType} from '../../../types/collection.type';
import {ErrorResponseType} from '../../../types/error-response.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-film-collection',
  templateUrl: './film-collection.component.html',
  styleUrl: './film-collection.component.scss'
})
export class FilmCollectionComponent implements OnInit, OnDestroy {
  private filmService: FilmService = inject(FilmService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private destroy$: Subject<void> = new Subject();

  public films: CollectionItemType[] = [];
  public title: string = '';
  constructor() {

  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        const collectionNameFromParams = params['collection'];

        switch (collectionNameFromParams) {
          case 'TOP_250_MOVIES':
            this.title = 'топ 250 фильмов';
            break;
        }

        this.filmService.getFilmsCollection(collectionNameFromParams)
          .subscribe({
            next: ((data: CollectionType | ErrorResponseType) => {
              let error = null;
              if ((data as ErrorResponseType).message !== undefined) {
                error = (data as ErrorResponseType).message;
              }
              if (error) {
                this._snackBar.open(error);
                throw new Error(error);
              }
              this.films = (data as CollectionType).items

            }),
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка получения данных');
              }
            }
          })
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
