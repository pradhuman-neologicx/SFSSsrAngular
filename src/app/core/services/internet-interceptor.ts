import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only check for internet when running in browser
    if (this.isBrowser && !navigator.onLine) {
      if (typeof window !== 'undefined') {
        window.alert('Internet is required.');
      }

      // Throw error to stop request
      return throwError(
        () => new HttpErrorResponse({ error: 'Internet is required.' })
      );
    }

    // Otherwise continue the request
    return next.handle(request);
  }
}
