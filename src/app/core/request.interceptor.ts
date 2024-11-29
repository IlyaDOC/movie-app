import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {config} from '../utils/config';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


const accessToken = config.accessToken;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor is working');
    if (accessToken) {
      const cloneReq = req.clone({
        headers: req.headers
          .set('Accept', 'application/json')
          .set('X-API-KEY', accessToken)
      });

      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
