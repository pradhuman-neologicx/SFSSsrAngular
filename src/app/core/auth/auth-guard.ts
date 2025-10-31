import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: JwtService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.getisLoggedIn();
    const isAuthPage = state.url.includes('sign_in') || state.url.includes('forgot_password');

    // If route doesn't require auth (like login page)
    if (next.data['requiresAuth'] === false) {
      if (isLoggedIn) {
        // If user is logged in and trying to access auth pages, redirect to dashboard
        return this.router.createUrlTree(['/admin/dashboard']);
      }
      return true; // Allow access to auth pages if not logged in
    }

    // For protected routes
    if (isLoggedIn) {
      return true; // Allow access to protected routes if logged in
    }

    // Not logged in and trying to access protected route
    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;
    
    // Redirect to login page with the return url
    return this.router.createUrlTree(['/admin/sign_in'], { 
      queryParams: { returnUrl: state.url } 
    });
  }
}