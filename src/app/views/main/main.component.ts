import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/services/posts.service';
import {Subject, takeUntil} from 'rxjs';
import {ErrorResponseType} from '../../types/error-response.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActiveParamsType} from '../../types/active-params.type';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MediaPostsType} from '../../types/media-posts.type';
import {HttpErrorResponse} from '@angular/common/http';
import {ActiveParamsUtil} from '../../utils/active-params.util';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FilmService} from '../../shared/services/film.service';
import {CollectionType} from '../../types/collection.type';
import {CollectionItemType} from '../../types/collection-item.type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  private postsService: PostsService = inject(PostsService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private filmService: FilmService = inject(FilmService);

  private destroy$: Subject<void> = new Subject<void>();
  private activeParams: ActiveParamsType = {categories: []};
  public posts: MediaPostsType = {
    total: 0,
    totalPages: 0,
    items: [
      {
        kinopoiskId: 0,
        imageUrl: '',
        title: '',
        description: '',
        url: '',
        publishedAt: ''
      }
    ]
  };
  private totalPages: number = 0;
  public premieres: CollectionItemType[] = [];
  public showRating: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.setFirstPage();
    this.getNewsData();
    this.getPremieresData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Подписываемся на получения премьер данного месяца */
  getPremieresData(): void {
    const date = new Date();
    const actualYear = new Date().getFullYear();
    const actualMonth = date.toLocaleString('en-US', {month: 'long'}).toUpperCase();
    this.filmService.getPremieres(actualYear, actualMonth)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (data: CollectionType | ErrorResponseType) => {
            this.catchErrorInResponse(data as ErrorResponseType);

            this.premieres = (data as CollectionType).items;

          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка получения данных');
            }
          }
        }
      )
  }



  /** Подписываемся на получение новостей с кинопоиска */
  getNewsData() {
    this.postsService.getMediaPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MediaPostsType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);

          // Получаем из запроса общее количество страниц
          this.totalPages = (data as MediaPostsType).totalPages;

          if (this.totalPages && this.activeParams.page) {
            // Далаем запрос с последней страницы (в query параметрах она будет первой,
            // т.к. с сервера первыми выдает самые старые новости.
            // При итерировании компонента новостей, массив тоже переворачивается в шаблоне
            const actualPage: number = this.totalPages - this.activeParams.page + 1;

            // Получаем уже данные по новостям
            this.postsService.getMediaPosts(actualPage)
              .subscribe((data: MediaPostsType | ErrorResponseType) => {
                this.posts = data as MediaPostsType;
              })
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


  /** Устанавливаем в query параметры страницы 1 страницу
   * для показа 1 страницы списка новостей */
  setFirstPage() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (!params['page']) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {page: 1},
          queryParamsHandling: 'merge'
        });
      }
      // Устанавливаем значение из query параметров для запросов
      this.activeParams = ActiveParamsUtil.processParams(params);
    })
  };


}
