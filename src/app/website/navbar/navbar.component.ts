import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/Employee.service';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuOpen = false;
  isAuthenticated: any;
  constructor(public authService: EmployeeService, private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  async logout() {
    // try {
    //   await this.authService();
    //   this.router.navigate(['/login']);
    // } catch (error) {
    //   console.error('Logout failed:', error);
    // }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.menuOpen = false;
  }
}
