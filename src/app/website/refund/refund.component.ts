import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './refund.component.html',
})
export class RefundComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  sections = [
    {
      title: 'Overview',
      content:
        'TinkerTek Labs offers refunds for eligible purchases within our policy guidelines. This ensures fair treatment for schools and educators using our edtech services. Effective: October 28, 2025.',
    },
    {
      title: 'Eligibility for Refunds',
      content:
        'Refunds are available for subscriptions canceled within 14 days of purchase. Custom implementations or used credits are non-refundable.',
    },
    {
      title: 'Refund Process',
      content:
        'Submit requests via support@tinkerteklabs.com with order details. We review within 5 business days and process via the original payment method (3–10 days).',
    },
    {
      title: 'Non-Refundable Items',
      content:
        'Digital downloads, custom AI models, and training sessions are non-refundable once delivered. No refunds after 30 days of active use.',
    },
    {
      title: 'Disputes',
      content:
        'We aim to resolve issues amicably. For unresolved cases, contact us before escalating to payment providers.',
    },
  ];

  ngOnInit() {
    this.titleService.setTitle('Refund Policy | TinkerTek Labs');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Details on our refund process for edtech subscriptions and services at TinkerTek Labs.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'refund policy, cancellation, edtech refunds, TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Refund Policy - TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Clear guidelines for refunds on our AI and ERP tools.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/refund',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
