import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private formatErrors(error: any) {
    let errorMessage = '';
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
  // client-side error
  errorMessage = `Error: ${error.error.message}`;
} else {
  // server-side error
  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
    console.log(errorMessage);
    return throwError(error.error);
  }

  // private formatErrors(error: any) {
  //   const errorMessage = this.handleResponseError(error);
  //   console.log(errorMessage);
  //   return throwError(() => errorMessage);
  // }

  // private handleResponseError(error: any): string {
  //   let errorMessage = '';

  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

  //     if (
  //       error.status === 422 &&
  //       error.error.message &&
  //       (error.error.message.includes('The selected user id is invalid') ||
  //         error.error.message.includes('Your account has been deactivated') ||
  //         error.error.message.includes('Your token has been expired') ||
  //         error.error.message.includes(
  //           'Your token has been expired. Please login again.'
  //         ))
  //     ) {
  //       // Log user out and redirect to home route if token is expired
  //       this.jwtService.clearStorage(); // Clear token (implement this method in your JwtService)
  //       this.router.navigate(['/sign_in']); // Navigate to home route
  //       alert(error.error.message); // Show alert with error message

  //     } else if (error.error && error.error.message) {
  //       alert(error.error.message); // Show alert with error message
  //     } else {
  //       alert('Something went wrong');
  //     }
  //   }

  //   return errorMessage;
  // }
  // search(term: string) {
  //   if (term === "") {
  //     return of([]);
  //   }
  //   return this.http
  //     .get<[any, any[]]>(
  //       `${environment.api_url}routes?odata?$filter=contains(routeSourceName,` +
  //       `${term}` +
  //       `)`
  //     )
  //     .pipe(map((response: any) => response["routesModel"]));

  // }
  get(path: string, header: any): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: header })
      .pipe(catchError(this.formatErrors));
    // }else{
    //   return window.alert("Connection Offline");
    // }
  }

  put(path: string, body: any, header: any): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body, { headers: header })
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  putWithoutHeader(path: string, body: any): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  post(path: string, body: any, headers: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, { headers })
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  postwithoutbody(path: string, headers: HttpHeaders): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, {}, { headers }) // Correct placement of headers
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }

  postWithoutHeader(path: string, body: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  delete(path: string, body: Object = {}): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  deleteFun(
    path: string,
    options: { headers?: HttpHeaders } = {}
  ): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, options).pipe(
      retry(1), // Optional: Retry once if the request fails (consider removing if not needed)
      catchError((error) => {
        console.error('Delete request failed:', error);
        return this.handleError(error); // Use your custom error handler
      })
    );
  }
  patch(path: string, body: any): Observable<any> {
    return this.http
      .patch(`${environment.api_url}${path}`, body)
      .pipe(
        catchError(this.formatErrors),
        retry(1),
        catchError(this.handleError)
      );
  }
  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   if (error.status === 422) {
  //     const errorMessage =
  //       error.errors?.name?.[0] ||
  //       error.errors?.email?.[0] ||
  //       error.errors?.mobile?.[0] ||
  //       error.errors?.input_fields?.[0] ||
  //       error.errors?.material_id?.[0];
  //     console.error('Validation Error:', errorMessage);

  //     return throwError(() => new Error(errorMessage));
  //   }
  //   //console.log(errorMessage+"er");
  //   window.alert(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
  handleError(error: any) {
  let errorMessage = '';
 if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
  // client-side error
  errorMessage = `Error: ${error.error.message}`;
} else {
  // server-side error
  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}


  if (error.status === 422) {
    const validationMsg =
      error.errors?.name?.[0] ||
      error.errors?.email?.[0] ||
      error.errors?.mobile?.[0] ||
      error.errors?.input_fields?.[0] ||
      error.errors?.material_id?.[0];
    console.error('Validation Error:', validationMsg);
    return throwError(() => new Error(validationMsg));
  }

  // ✅ Only show alert in the browser
  if (isPlatformBrowser(this.platformId)) {
    window.alert(errorMessage);
  } else {
    console.error('SSR error:', errorMessage);
  }

  return throwError(() => errorMessage);
}
}
