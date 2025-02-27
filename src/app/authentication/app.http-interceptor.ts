import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Uri from 'urijs';
import {
  selectIsAuthenticated,
  selectUserInfo,
} from '../authentication/auth.selector';
import { ErrorPayload } from '../core/model/error-payload.model';
import { LogoutAction } from './auth.actions';
import { AuthState } from './auth.state';
import { UserInfo } from './model/user-info.model';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  isAuthenticated: boolean;
  userInfo: UserInfo;

  constructor(private store: Store<AuthState>, private injector: Injector, private cookieService: CookieService) {
    this.store
      .select(selectIsAuthenticated)
      .subscribe((x) => (this.isAuthenticated = x));
    this.store.select(selectUserInfo).subscribe((x) => (this.userInfo = x));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const translateService = this.injector.get(TranslateService);

    request = request.clone({
      setHeaders: {
        'Cache-Control': `no-cache`,
        Pragma: `no-cache`,
        Expires: `Sat, 01 Jan 2000 00:00:00 GMT`,
        'If-Modified-Since': `0`,
        Authorization: `Bearer ${this.cookieService.get('token')}`
      },
    });
    
    return next.handle(request).pipe(
      catchError((toParseError: HttpErrorResponse) => {
        return new Promise<any>((resolve, reject) => {
          return this.parseError(toParseError).catch(
            (err: HttpErrorResponse) => {
              console.log(err);
              let errCode = !!err.statusText
                ? err.statusText
                : 'ERROR.SERVER-ERROR';
              let field;

              switch (err.status) {
                case 0:
                  errCode = 'ERROR.CANCELED';
                  break;
                case 500:
                  errCode = 'ERROR.TECHNICAL';
                  break;
                case 422:
                  if (!!err.error.code) {
                    errCode = err.error.code;
                    if (err.error.field) {
                      field = translateService.instant(err.error.field);
                    }
                  }
                  break;
                case 401:
                  this.store.dispatch(new LogoutAction());
                  break;
                case 403:
                  errCode = 'ERROR.UNAUTHORIZED';
                  break;
                case 404:
                  errCode = 'ERROR.NOT-FOUND';
                  break;
                case 400:
                  if (!!err.error.code) {
                    errCode = err.error.code;
                  }
                  break;
                case 502:
                  if (err.error.code) {
                    errCode = err.error.code;
                  } else {
                    errCode = 'ERROR.TECHNICAL';
                  }
                  break;
              }

              reject(
                new ErrorPayload(
                  err.status,
                  translateService.instant(errCode, { field: field })
                )
              );
            }
          );
        });
      })
    );
  }

  private parseError(err: HttpErrorResponse): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (
        err instanceof HttpErrorResponse &&
        err.error instanceof Blob &&
        err.error.type === 'application/json'
      ) {
        const reader = new FileReader();
        reader.onload = (e: Event) => {
          try {
            const errmsg = JSON.parse((<any>e.target).result);
            reject(
              new HttpErrorResponse({
                error: errmsg,
                headers: err.headers,
                status: err.status,
                statusText: err.statusText,
                url: err.url,
              })
            );
          } catch (e) {
            reject(err);
          }
        };
        reader.onerror = (e) => {
          reject(err);
        };
        reader.readAsText(err.error);
      } else {
        reject(err);
      }
    });
  }
}
