import {Component, inject, OnInit} from '@angular/core';
import {FilmService} from '../../shared/services/film.service';
import {ActivatedRoute} from '@angular/router';
import {FilmType} from '../../types/film.type';
import {ErrorResponseType} from '../../types/error-response.type';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StaffType} from '../../types/staff.type';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrl: './film-page.component.scss'
})
export class FilmPageComponent implements OnInit {
  ///////// Зависимости
  private filmService: FilmService = inject(FilmService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  /////////

  ///////// Переменные
  public filmData: FilmType;
  public staffData: StaffType[];
  public groupedStaff: { [key: string]: StaffType[] } = {};


  /////////

  constructor() {
    this.filmData = {
      kinopoiskId: 0,
      kinopoiskHDId: '',
      imdbId: '',
      nameRu: '',
      nameEn: '',
      nameOriginal: '',
      posterUrl: '',
      posterUrlPreview: '',
      coverUrl: '',
      logoUrl: '',
      reviewsCount: 0,
      ratingGoodReview: 0,
      ratingGoodReviewVoteCount: 0,
      ratingKinopoisk: 0,
      ratingKinopoiskVoteCount: 0,
      ratingImdb: 0,
      ratingImdbVoteCount: 0,
      ratingFilmCritics: 0,
      ratingFilmCriticsVoteCount: 0,
      ratingAwait: 0,
      ratingAwaitCount: 0,
      ratingRfCritics: 0,
      ratingRfCriticsVoteCount: 0,
      webUrl: '',
      year: 0,
      filmLength: 0,
      slogan: '',
      description: '',
      shortDescription: '',
      editorAnnotation: '',
      isTicketsAvailable: false,
      productionStatus: '',
      type: '',
      ratingMpaa: '',
      ratingAgeLimits: '',
      hasImax: false,
      has3D: false,
      lastSync: '',
      countries: [
        {
          country: ''
        }
      ],
      genres: [
        {
          genre: ''
        }
      ],
      startYear: 0,
      endYear: 0,
      serial: false,
      shortFilm: false,
      completed: false
    }

    this.staffData = [{
      staffId: 0,
      nameRu: '',
      nameEn: '',
      description: '',
      posterUrl: '',
      professionText: '',
      professionKey: ''
    }]
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

      // Подписываемся на получение данных о фильме
      this.filmService.getFilm(params['id'])
        .subscribe({
          next: (data: FilmType | ErrorResponseType) => {
            let error = null;
            if ((data as ErrorResponseType).message !== undefined) {
              error = (data as ErrorResponseType).message;
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.filmData = data as FilmType;

          },

          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка получения данных');
            }
          }
        });

      // Подписываемся на получение данных об актерах, режиссерах и т.д
      this.filmService.getStaff(params['id'])
        .subscribe({
          next: (data: StaffType[] | ErrorResponseType) => {
            let error = null;
            if ((data as ErrorResponseType).message !== undefined) {
              error = (data as ErrorResponseType).message;
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.staffData = data as StaffType[];
            this.groupByProfession();

          },
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
  // Группируем массив с сотрудниками по профессиям по ключу
  groupByProfession() {
    this.groupedStaff = this.staffData.reduce((acc, staff) => {
      if (!acc[staff.professionKey]) {
        acc[staff.professionKey] = [];
      }
      acc[staff.professionKey].push(staff);
      return acc;
    }, {} as { [key: string]: StaffType[] });
  }

}
