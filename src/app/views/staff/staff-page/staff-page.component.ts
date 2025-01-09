import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {StaffService} from '../../../shared/services/staff.service';
import {ActivatedRoute} from '@angular/router';
import {StaffType} from '../../../types/staff.type';
import {ErrorResponseType} from '../../../types/error-response.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, takeUntil} from 'rxjs';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrl: './staff-page.component.scss'
})
export class StaffPageComponent implements OnInit, OnDestroy {
  private staffService: StaffService = inject(StaffService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  public staffInfo: StaffType;
  private destroy$: Subject<void> = new Subject();
  public showMore: boolean = false;
  public moreInfoButtonText: string = 'Все детали о персоне';
  public spouseType: string = '';
  public groupedFilms: {
    [key: string]:

        {
          filmId: number,
          nameRu: string,
          nameEn: string,
          rating: string,
          general: boolean,
          description: string,
          professionKey: string
        }[]

  } = {};
  public staffProfessions: string[] = [];
  public staffFactsCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 20,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2,
      },

    },
  }

  public activeFilter: WritableSignal<string> = signal<string>('');

  constructor() {
    this.staffInfo = {
      personId: 0,
      webUrl: '',
      nameRu: '',
      nameEn: '',
      sex: '',
      posterUrl: '',
      growth: 0,
      birthday: '',
      death: '',
      age: 0,
      birthplace: '',
      deathplace: '',
      hasAwards: 0,
      profession: '',
      facts: [
        ''
      ],
      spouses: [
        {
          personId: 0,
          name: '',
          divorced: false,
          divorcedReason: '',
          sex: '',
          children: 0,
          webUrl: '',
          relation: ''
        }
      ],
      films: [
        {
          filmId: 0,
          nameRu: '',
          nameEn: '',
          rating: '',
          general: false,
          description: '',
          professionKey: ''
        }
      ]
    }
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.getStaffInfoData(params['staffId']);
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Получаем всю информацию об актере по подписке */
  getStaffInfoData(staffId: string) {
    this.staffService.getStaffInfo(staffId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: StaffType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);
          this.staffInfo = data as StaffType;
          this.spouseType = this.staffInfo.sex === 'MALE' ? 'Супруга' : 'Супруг';
          this.groupFilmsByProfession();

          /** Создает массив на основе всех профессий из массива фильмов.
           * Вначале создается массив только с профессиями, затем через new Set убираем все дубликаты
           * и получаем объект с уникальными профессиями, который вновь превращаем в массив.*/
          this.staffProfessions = Array.from(new Set(this.staffInfo.films.map(film => film.professionKey)));
          // Устанавливаем значение фильтра по умолчанию на первый элемент массива
          this.activeFilter.set(this.staffProfessions[0]);

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


  /** Показывает и скрывает подробную информацию об актере */
  showMoreAction(): void {
    this.showMore = !this.showMore;
    this.moreInfoButtonText = this.showMore ? 'Скрыть детали' : 'Все детали о персоне';
  }


  /** Группирует список фильмов с ключом (по типу профессии) по профессиям */
  groupFilmsByProfession() {
    if (this.staffInfo.films && this.staffInfo.films.length > 0) {
      this.groupedFilms = this.staffInfo.films.reduce((acc, film) => {
        if(!acc[film.professionKey]) {
          acc[film.professionKey] = [];
        }

        acc[film.professionKey].push(film);
        return acc;
      }, {} as {[key: string] : {
          filmId: number,
          nameRu: string,
          nameEn: string,
          rating: string,
          general: boolean,
          description: string,
          professionKey: string
        }[]})
    }
  }
  /** Получаем значение профессии из дочернего компонента
   * и устанавливаем это значение для активного фильтра. Если значение активного
   * фильтра и профессии совпадают, элемент становится активным*/
  setActiveFilter(profession: string): void {
    this.activeFilter.set(profession);
  }


  getFilteredFilms() {

  }
}
