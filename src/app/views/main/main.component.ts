import {Component, inject, OnInit} from '@angular/core';
import {FilmService} from '../../shared/services/film.service';
import {CollectionType} from '../../types/collection.type';
import {CollectionEnum} from '../../enums/collection.enum';
import {CollectionItemType} from '../../types/collection-item.type';
import {ErrorResponseType} from '../../types/error-response.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private filmService: FilmService = inject(FilmService);
  public totalPages: number = 0;
  public films: CollectionItemType[] = [];
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
  }

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms(): void {
    this.filmService.getFilmsCollection(CollectionEnum.TOP250MOVIES)
      .subscribe({
        next: (data: CollectionType | ErrorResponseType) => {
          let error = null;
          if ((data as ErrorResponseType).message !== undefined) {
            error = (data as ErrorResponseType).message;
          }

          if(error) {
            this._snackBar.open(error);
            throw new Error(error);
          }

          this.films = (data as CollectionType).items;
        },

        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка получения данных');
          }
        }
      })
  };

}
