import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  title = 'mat_admin';
  themeSectionOpen: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private overlay: OverlayContainer
  ) {}

  ChangeLang(lang: any) {
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang', selectedLanguage);
  }

  lang: string = '';

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    // this.render.addClass(this.document.body, 'lightTheme')

    const theme = localStorage.getItem('theme');
    if (theme) {
      this.applyTheme(theme);
    } else {
      this.applyTheme('light'); // Default theme
    }
    this.checkScreenSize();
  }

  // sidenav properties
  sidenavMode: MatDrawerMode = 'side';
  contentMargin: string = '0'; // Initially, no margin

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth <= 768) {
      // md and below
      this.sidenavMode = 'side';
    } else {
      // lg and above
      this.sidenavMode = 'side';
    }

    // Set margin based on collapse state
    if (this.collapsed) {
      this.contentMargin = '95';
    } else {
      this.contentMargin = this.sidenavMode === 'side' ? '270px' : '';
    }
  }

  // sidenav toggle
  collapsed = false;

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    // Update margin based on collapse state and screen size
    if (this.collapsed) {
      this.contentMargin = '95px';
    } else {
      this.contentMargin = this.sidenavMode === 'side' ? '270px' : '0';
    }
  }

  get sidenavWidth(): string {
    return this.collapsed ? '73px' : '255px';
  }

  // change theme code start
  changeTheme(themevalue: string) {
    this.applyTheme(themevalue);
    localStorage.setItem('theme', themevalue);
  }

  private applyTheme(themevalue: string) {
    this.render.removeClass(this.document.body, 'lightTheme');
    this.render.removeClass(this.document.body, 'darkTheme');
    if (themevalue === 'light') {
      this.render.addClass(this.document.body, 'lightTheme');
    }
    if (themevalue === 'dark') {
      this.render.addClass(this.document.body, 'darkTheme');
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (
      !targetElement.closest('.theme-change-section') &&
      !targetElement.closest('.setting-icon')
    ) {
      this.themeSectionOpen = false;
    }
  }
  // change theme code end

  toggleThemeSection() {
    this.themeSectionOpen = !this.themeSectionOpen;
  }
}
