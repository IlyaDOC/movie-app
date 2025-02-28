import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from '../../../shared/services/film.service';
import {StaffService} from '../../../shared/services/staff.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FilmType} from '../../../types/film.type';
import {FilmStaffType} from '../../../types/film-staff.type';
import {BoxOfficeType} from '../../../types/box-office.type';
import {BoxOfficeItemType} from '../../../types/box-office-item.type';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ErrorResponseType} from '../../../types/error-response.type';
import {HttpErrorResponse} from '@angular/common/http';
import {FactsType} from '../../../types/facts.type';
import {FactItemType} from '../../../types/fact-item.type';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrl: './film-page.component.scss'
})
export class FilmPageComponent implements OnInit, OnDestroy {
  ///////// Зависимости
  private filmService: FilmService = inject(FilmService);
  private staffService: StaffService = inject(StaffService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  /////////

  ///////// Переменные класса
  public filmData: FilmType;
  public staffData: FilmStaffType[];
  public groupedStaff: { [key: string]: FilmStaffType[] } = {};
  public boxOfficeData: BoxOfficeType;
  public boxOfficeDataBudget: BoxOfficeItemType | undefined;
  public boxOfficeDataRus: BoxOfficeItemType | undefined;
  public boxOfficeDataUSA: BoxOfficeItemType | undefined;
  public boxOfficeDataWorld: BoxOfficeItemType | undefined;
  public boxOfficeTotal: number = 0;
  public factsAndBloopersData: FactsType = {total: 0, items: []};
  public groupedFactsAndBloopersData: { [key: string]: FactItemType[] } = {};
  public isSpoiler: boolean = true;
  public factTitle: string = 'Знаете ли вы что...';
  public bloopersTitle: string = 'Ошибки в фильме';
  public factsType: string = 'FACT';
  public bloopersType: string = 'BLOOPER';
  private destroy$: Subject<void> = new Subject();
  /////////

  ////////Owl Carousel
  public staffCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 20,
    responsive: {
      0: {
        items: 2
      },
      500: {
        items: 4,
      },

      700: {
        items: 5,
      }

    },
  }

  ///////////

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
    };

    this.staffData = [{
      staffId: 0,
      nameRu: '',
      nameEn: '',
      description: '',
      posterUrl: '',
      professionText: '',
      professionKey: ''
    }];

    this.boxOfficeData = {
      total: 0,
      items: [
        {
          type: '',
          amount: 0,
          currencyCode: '',
          name: '',
          symbol: ''
        }]
    };

  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
      const filmIdFromParams = params['filmId'];

      this.getFilmData(filmIdFromParams);
      this.getStaffData(filmIdFromParams);
      this.getBoxOfficeData(filmIdFromParams);
      this.getFactsAndBloopers(filmIdFromParams);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Функция для обработки ошибочного ответа.
   * Требуется в связи постоянно повторяющимся фрагментом кода в каждом запросе */
  catchErrorInResponse(data: ErrorResponseType) {
    let error = null;
    if ((data as ErrorResponseType).message !== undefined) {
      error = (data as ErrorResponseType).message;
    }
    if (error) {
      this._snackBar.open(error);
      throw new Error(error);
    }
  }


  /** Подписываемся на получение данных о фильме. FilmId получем из query параметров */
  getFilmData(filmID: string) {
    this.filmService.getFilm(filmID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: FilmType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);

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
  };


  /** Группируем массив с сотрудниками полученный
   * через staffService.getStaff по профессиям по ключу */
  groupByProfession() {
    if (this.groupedStaff) {
      this.groupedStaff = this.staffData.reduce((acc, staff) => {
        if (!acc[staff.professionKey]) {
          acc[staff.professionKey] = [];
        }
        if (staff.nameRu) {
          acc[staff.professionKey].push(staff);
        }

        return acc;
      }, {} as { [key: string]: FilmStaffType[] });
    }

  };


  /** Подписываемся на получение данных об актерах, режиссерах и т.д.
   * FilmId так же получаем из query параметров */
  getStaffData(filmId: string) {
    this.staffService.getFilmStaff(filmId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: FilmStaffType[] | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);

          this.staffData = data as FilmStaffType[];
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
  };


  /** Подписываемся на запрос по получению данных о кассовых сборах и бюджете фильма */
  getBoxOfficeData(filmId: string) {
    this.filmService.getBoxOffice(filmId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: BoxOfficeType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);
          this.boxOfficeData = data as BoxOfficeType;
          if (this.boxOfficeData) {

            // Распределяем полученные данные на бюджет, сборы в России, США и мире
            this.boxOfficeDataBudget = this.boxOfficeData.items.find((item: BoxOfficeItemType): boolean => item.type === 'BUDGET');
            this.boxOfficeDataRus = this.boxOfficeData.items.find((item: BoxOfficeItemType): boolean => item.type === 'RUS');
            this.boxOfficeDataUSA = this.boxOfficeData.items.find((item: BoxOfficeItemType): boolean => item.type === 'USA');
            this.boxOfficeDataWorld = this.boxOfficeData.items.find((item: BoxOfficeItemType): boolean => item.type === 'WORLD');

            // Сумма общих сборов
            if (this.boxOfficeDataUSA?.amount && this.boxOfficeDataWorld?.amount) {
              this.boxOfficeTotal = (this.boxOfficeDataRus?.amount ?? 0) + this.boxOfficeDataUSA.amount + this.boxOfficeDataWorld.amount;
            }
          }
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


  /** Подписываемся на запрос по получению фактов и ляпов */
  getFactsAndBloopers(filmId: string) {
    this.filmService.getFacts(filmId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: FactsType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);

          this.factsAndBloopersData = data as FactsType;

          this.groupByFactType();
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка получения данных');
          }
        }
      })
  }

  /** Группирует факты и ляпы по двум категориям для последующего удобного отображения
   * в соответствующих блоках */
  groupByFactType() {
    if (this.factsAndBloopersData) {
      this.groupedFactsAndBloopersData = this.factsAndBloopersData.items.reduce((acc, fact) => {
        if (!acc[fact.type]) {
          acc[fact.type] = [];
        }
        acc[fact.type].push(fact);
        return acc;
      }, {} as { [key: string]: FactItemType[] });
    }
  };
}
