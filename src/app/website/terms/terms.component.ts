import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './terms.component.html',
})
export class TermsComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  sections = [
    {
      title: 'Acceptance of Terms',
      content:
        "By accessing or using TinkerTek Labs' services, you agree to these Terms and Conditions. If you do not agree, please do not use our platform. Effective: October 28, 2025.",
    },
    {
      title: 'Description of Services',
      content:
        'We provide edtech tools including AI-powered labs, ERP systems for schools, and personalized learning platforms.',
    },
    {
      title: 'User Conduct',
      content:
        'Users must use services ethically, respect intellectual property, and comply with applicable laws.',
    },
    {
      title: 'Intellectual Property',
      content:
        'All content and materials are owned by TinkerTek Labs or licensors. Users are granted limited educational use rights.',
    },
    {
      title: 'Termination',
      content:
        'We may suspend or terminate accounts for violations. Upon termination, access ends but obligations survive.',
    },
    {
      title: 'Limitation of Liability',
      content:
        "Services are provided 'as is'. We are not liable for indirect damages. Liability capped at fees paid in prior 12 months.",
    },
    {
      title: 'Governing Law',
      content:
        'These terms are governed by the laws of India. Disputes resolved via arbitration.',
    },
  ];

  ngOnInit() {
    this.titleService.setTitle('Terms and Conditions | TinkerTek Labs');
    this.metaService.updateTag({
      name: 'description',
      content:
        "Review the terms of service for using TinkerTek Labs' educational platforms and tools.",
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'terms of service, user agreement, edtech terms, TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Terms and Conditions - TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Legal terms governing your use of our AI and ERP solutions.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/terms',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
