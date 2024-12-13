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

  constructor() {
  }

  ngOnInit() {
    this.setFirstPage();
    this.getNewsData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getNewsData() {
    this.postsService.getMediaPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MediaPostsType | ErrorResponseType) => {
          this.catchErrorInResponse(data as ErrorResponseType);
          this.totalPages = (data as MediaPostsType).totalPages;
          if (this.totalPages && this.activeParams.page) {
            const actualPage: number = this.totalPages - this.activeParams.page + 1;
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

  setFirstPage() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (!params['page']) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {page: 1},
          queryParamsHandling: 'merge'
        });
      }

      this.activeParams = ActiveParamsUtil.processParams(params);
    })
  }
}
