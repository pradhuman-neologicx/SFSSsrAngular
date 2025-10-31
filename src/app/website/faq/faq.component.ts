import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { CtaComponent } from '../components/cta/cta.component';


interface FAQ {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, CtaComponent],
  templateUrl: './faq.component.html',
})
export class FAQComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // Accordion state
  openIndex = signal<number | null>(null);

  // FAQ Data
  faqs: FAQ[] = [
    {
      question: 'What is digital transformation in education?',
      answer:
        'Digital transformation involves integrating technologies like AI, ERP systems, and interactive labs to modernize school operations and enhance student learning. At TinkerTek Labs, we help schools shift from traditional methods to dynamic, data-driven environments.',
      category: 'Basics',
    },
    {
      question: 'How do your AI labs benefit students?',
      answer:
        'Our Hands-On AI Labs allow students to build and program AI models, fostering critical thinking, creativity, and 21st-century skills. Studies show a 30% improvement in retention and engagement when integrated thoughtfully.',
      category: 'AI & Innovation',
    },
    {
      question: 'What ERP features do you offer for schools?',
      answer:
        'Our ERP solutions streamline admissions, attendance, grading, and fee management into one platform, reducing administrative time by up to 50% and freeing educators to focus on teaching.',
      category: 'School Management',
    },
    {
      question: 'How much does implementation cost?',
      answer:
        'Costs vary by school size and features, starting from affordable pilot programs. Contact our team for a customized quote—many schools see ROI within the first year through efficiency gains.',
      category: 'Pricing',
    },
    {
      question: 'Can we start with a trial or demo?',
      answer:
        'Absolutely! We offer free demos and 30-day pilots for AI labs and ERP modules. Schedule a call to see how it fits your curriculum.',
      category: 'Getting Started',
    },
    {
      question: 'Is your technology secure and compliant?',
      answer:
        'Yes, all our tools comply with GDPR, FERPA, and COPPA standards. We use enterprise-grade encryption and regular audits to protect student data.',
      category: 'Security',
    },
  ];

  toggleAccordion(index: number) {
    this.openIndex.update((prev) => (prev === index ? null : index));
  }

  ngOnInit(): void {
    this.titleService.setTitle('Frequently Asked Questions | TinkerTek Labs');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Get answers to common questions about our AI-powered educational tools, ERP systems, and school transformation services.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'FAQ, edtech, AI in education, school ERP, TinkerTek Labs, STEM labs',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'FAQ - TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Answers to your questions on digital transformation for schools.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/faq',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'FAQ - TinkerTek Labs',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: 'Common questions about our edtech solutions answered.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
