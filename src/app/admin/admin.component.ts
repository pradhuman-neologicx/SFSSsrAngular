import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
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
  themeSectionOpen = false;
  isMobile = false;
  sidenavOpened = false;
  sidenavMode: MatDrawerMode = 'side';
  contentMargin = '0';
  collapsed = false;
  lang = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2,
    private overlay: OverlayContainer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.lang = localStorage.getItem('lang') || 'en';

      const theme = localStorage.getItem('theme');
      if (theme) {
        this.applyTheme(theme);
      } else {
        this.applyTheme('light');
      }

      this.checkScreenSize();
    } else {
      // SSR fallback (safe defaults)
      this.lang = 'en';
      this.applyTheme('light');
    }
  }

  ChangeLang(lang: any) {
    if (isPlatformBrowser(this.platformId)) {
      const selectedLanguage = lang.target.value;
      localStorage.setItem('lang', selectedLanguage);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.sidenavMode = 'over';
        this.contentMargin = '0';
        this.sidenavOpened = false;
      } else {
        this.sidenavMode = 'side';
        this.contentMargin = this.collapsed ? '95px' : '270px';
        this.sidenavOpened = true;
      }
    }
  }

  toggleCollapsed() {
    if (this.isMobile) {
      this.sidenavOpened = !this.sidenavOpened;
    } else {
      this.collapsed = !this.collapsed;
      this.checkScreenSize();
    }
  }

  get sidenavWidth(): string {
    return this.collapsed ? '73px' : '255px';
  }

  changeTheme(themevalue: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(themevalue);
      localStorage.setItem('theme', themevalue);
    }
  }

  private applyTheme(themevalue: string) {
    this.render.removeClass(this.document.body, 'lightTheme');
    this.render.removeClass(this.document.body, 'darkTheme');
    if (themevalue === 'light') {
      this.render.addClass(this.document.body, 'lightTheme');
    } else if (themevalue === 'dark') {
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

  toggleThemeSection() {
    this.themeSectionOpen = !this.themeSectionOpen;
  }
}
