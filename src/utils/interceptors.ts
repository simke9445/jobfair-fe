import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

import { LocalStorageService } from 'src/services/localStorage.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.localStorageService.get('token');

    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(req);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.localStorageService.clear();
          this.router.navigate(['/auth/login']);
        }

        return throwError(error);
      }),
    );
  }
}

@Injectable()
export class ErrorNotificationInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `${error.error.message}`;
        } else {
          // server-side error
          if (error.error.message) {
            errorMessage = `${error.status} ${error.error.message}`;
          } else {
            errorMessage = `Something went wrong!`;
          }
        }

        this.toastrService.error('', errorMessage, {
          progressBar: true,
        });

        return throwError(errorMessage);
      }),
    );
  }
}