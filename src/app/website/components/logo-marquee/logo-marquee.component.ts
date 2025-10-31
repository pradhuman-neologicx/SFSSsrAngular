import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Company {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-logo-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-marquee.component.html',
  styleUrl: './logo-marquee.component.scss',
})
export class LogoMarqueeComponent {
  companies: Company[] = [
    { name: 'Microsoft', logo: 'assets/Company/1.png' },
    { name: 'Google', logo: 'assets/Company/2.png' },
    { name: 'Apple', logo: 'assets/Company/3.png' },
    { name: 'Amazon', logo: 'assets/Company/4.png' },
    { name: 'Meta', logo: 'assets/Company/5.png' },
    { name: 'Netflix', logo: 'assets/Company/6.png' },
    { name: 'Tesla', logo: 'assets/Company/7.png' },
  ];
  reversedCompanies = [...this.companies].reverse();
  trackByFn(index: number, company: Company): string {
    return `${company.name}-${index}`;
  }
}
