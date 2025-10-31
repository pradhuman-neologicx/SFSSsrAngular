import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        // if (error.error instanceof ErrorEvent) {
        //   // Client-side error
        //   errorMessage = `Error: ${error.error.message}`;
        // } else {
        //   // Server-side error
        //   errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        // }

        if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
  // client-side error
  errorMessage = `Error: ${error.error.message}`;
} else {
  // server-side error
  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}

        // Safe browser check before using window
        if (this.isBrowser && error.status === 500) {
          window.alert('Error Status: 500\nMessage: Internal server error');
        }

        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
