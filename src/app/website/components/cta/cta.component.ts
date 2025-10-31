// cta.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ButtonConfig {
  text: string;
  url: string;
}

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'], // Optional; Tailwind handles most styling
})
export class CtaComponent {
  @Input() title: string = 'Ready to Transform Your School?';
  @Input() subtitle: string =
    'Join thousands of schools worldwide that are already benefiting from our platform';
  @Input() primaryButton: ButtonConfig = {
    text: 'Request a Demo',
    url: '/contact',
  };
  @Input() secondaryButton: ButtonConfig = {
    text: 'Join / Partner With Us',
    url: '/contact',
  };
  @Input() showPrimaryIcon: boolean = true;
  @Input() showSecondaryIcon: boolean = true;
  // Optional: Toggle arrow icon on primary button

  private router = inject(Router);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
