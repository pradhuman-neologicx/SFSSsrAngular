import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  sections = [
    {
      title: 'Introduction',
      content:
        'At TinkerTek Labs, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our educational technology services, including AI labs, ERP systems, and related tools. Effective: October 28, 2025.',
    },
    {
      title: 'Information We Collect',
      content:
        'We collect personal data such as names, emails, school affiliations, and usage analytics to provide personalized learning experiences. For students and educators, this includes performance data from AI interactions, always with consent.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your data helps us improve services, personalize content, and ensure compliance with educational standards like FERPA and GDPR. We do not sell your data to third parties.',
    },
    {
      title: 'Data Sharing and Security',
      content:
        'We share data only with service providers under strict agreements. All data is encrypted using industry-standard protocols, and we conduct regular security audits.',
    },
    {
      title: 'Cookies and Tracking',
      content:
        'Our site uses cookies for functionality and analytics. You can manage preferences via browser settings. We respect Do Not Track signals.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access, correct, or delete your data. Contact us at privacy@schoolforschools.com for requests. For EU users, GDPR rights apply.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this policy; changes will be posted here with the effective date.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have questions about this Privacy Policy or our privacy practices, please contact us at:',
    },
  ];

  ngOnInit() {
    this.titleService.setTitle('Privacy Policy | School for Schools');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Learn how School for Schools protects your personal information and ensures data privacy in our edtech services.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'privacy policy, data protection, edtech privacy, GDPR, FERPA, School for Schools',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Privacy Policy - School for Schools',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Our commitment to safeguarding your data in educational technology.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/privacy',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
