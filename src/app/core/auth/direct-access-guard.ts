import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DirectAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // ✅ Only run browser-specific logic when on the client
    if (isPlatformBrowser(this.platformId)) {
      const performance = window.performance;
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

      const pageAccessedByReload =
        (performance.navigation && performance.navigation.type === 1) || // legacy API
        entries.some((nav) => nav.type === 'reload');

      // ✅ Allow navigation when page is reloaded (F5 or Ctrl+R)
      if (pageAccessedByReload) {
        return true;
      }

      // ✅ Handle direct access logic
      const loginAs = this.jwtService.getLoginAs();

      // If user tries to access root directly
      if (state.url === '/') {
        if (loginAs) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/sign_in']);
        }
        return false;
      }
    }

    // ✅ SSR or fallback
    return true;
  }
}
