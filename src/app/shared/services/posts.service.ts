import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MediaPostsType} from '../../types/media-posts.type';
import {config} from '../../utils/config';
import {ErrorResponseType} from '../../types/error-response.type';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  getMediaPosts(page: number = 1): Observable<MediaPostsType | ErrorResponseType> {
    return this.http.get<MediaPostsType | ErrorResponseType>(config.api + '/v1/media_posts', {
      params: {
        page: page,
      }
    });
  }
}
