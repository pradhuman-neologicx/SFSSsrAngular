// services.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';
import { CtaComponent } from '../components/cta/cta.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, CtaComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  imageUrl = 'assets/2147650738.jpg';

  services = [
    {
      icon: 'assets/svgs_collection/wrench.svg',
      title: 'ERP Customization',
      description:
        "Tailor our ERP system to match your school's unique workflows and requirements.",
      features: [
        'Custom modules',
        'Integration setup',
        'Data migration',
        'System optimization',
      ],
    },
    {
      icon: 'assets/svgs_collection/lightbulb.svg',
      title: 'AI Lab Setup',
      description:
        'Complete setup of AI and robotics labs with curriculum integration.',
      features: [
        'Infrastructure setup',
        'Equipment procurement',
        'Curriculum design',
        'Lab management',
      ],
    },
    {
      icon: 'assets/svgs_collection/users.svg',
      title: 'Training & Support',
      description:
        'Comprehensive training programs for educators, staff, and administrators.',
      features: [
        'Staff training',
        'Educator workshops',
        'Student programs',
        'Ongoing support',
      ],
    },
    {
      icon: 'assets/svgs_collection/book.svg',
      title: 'Implementation Consulting',
      description:
        'Expert guidance throughout your digital transformation journey.',
      features: [
        'Change management',
        'Process optimization',
        'Best practices',
        'Strategic planning',
      ],
    },
  ];

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Services');
    this.meta.updateTag({
      name: 'description',
      content:
        'Our services include ERP customization, AI lab setup, training, and implementation consulting.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'ERP customization, AI lab setup, training, implementation consulting',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Services' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Our services include ERP customization, AI lab setup, training, and implementation consulting.',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://myapp.com/assets/og-image.png',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://myapp.com' });
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
