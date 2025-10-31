import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { CtaComponent } from '../components/cta/cta.component';

interface CaseStudy {
  title: string;
  description: string;
  quote: string;
  author: string;
  image: string;
  category: 'erp' | 'tinkertek' | 'full';
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, CtaComponent],
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent implements OnInit {
  selectedTab: string = 'all';
caseStudies: CaseStudy[] = [];
    private titleService = inject(Title);
     private metaService = inject(Meta);

  ngOnInit() {
    // 🧠 SEO Meta Setup
    this.titleService.setTitle(
      'Case Studies & Success Stories | TinkerTek Labs - ERP & AI Implementation'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore real success stories from schools across India. See how ERP implementations, TinkerTek Labs, and full digital transformations have streamlined operations, enhanced STEM education, and boosted student engagement.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'case studies, success stories, ERP implementation, TinkerTek Labs, AI robotics education, school digital transformation, STEM success stories',
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Case Studies & Success Stories | TinkerTek Labs',
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Discover how leading schools achieved 40% efficiency gains, increased student participation, and transformed education with our solutions.',
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/case-studies',
    });

    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://schoolforschools.com/tinkertek/643.jpg',
    });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Case Studies | TinkerTek Labs',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Real testimonials from schools on ERP, AI labs, and digital shifts. See the impact on education.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://schoolforschools.com/tinkertek/643.jpg',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

    // 🎓 Data Initialization
    this.caseStudies = [
      {
        title: 'Delhi Public School - ERP Implementation',
        description:
          'Implemented our ERP system to streamline admissions and academic management, reducing administrative time by 40%.',
        quote: 'The system has revolutionized our daily operations!',
        author: 'Dr. Rajesh Kumar, Principal',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
        category: 'erp',
      },
      {
        title: "St. Xavier's Academy - AI Lab Launch",
        description:
          'Set up TinkerTek Labs, enhancing STEM education and preparing students for future tech careers.',
        quote: 'Students are more engaged than ever before.',
        author: 'Ms. Priya Sharma, Head of STEM',
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        category: 'tinkertek',
      },
      {
        title: 'Riverside International - Full Digital Shift',
        description:
          'Complete digital transformation with ERP and innovation programs, improving parent communication and analytics.',
        quote: 'A game-changer for our institution.',
        author: 'Admin Director, Riverside',
        image:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        category: 'full',
      },
      {
        title: 'Modern School - ERP Optimization',
        description:
          'Optimized ERP for better fee management and reporting, resulting in 30% faster financial processing.',
        quote: 'Our financial operations are now seamless and error-free.',
        author: 'Finance Head, Modern School',
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        category: 'erp',
      },
      {
        title: 'Cathedral School - Robotics Innovation',
        description:
          'Introduced TinkerTek robotics kits, boosting student participation in tech competitions by 60%.',
        quote:
          'The labs have sparked creativity and innovation in our students.',
        author: 'Science Coordinator, Cathedral School',
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
        category: 'tinkertek',
      },
      {
        title: 'Doon School - Comprehensive Tech Upgrade',
        description:
          'Full suite implementation of ERP and TinkerTek, leading to enhanced learning outcomes and operational efficiency.',
        quote:
          'Transformed our school into a modern educational powerhouse.',
        author: 'Principal, Doon School',
        image:
          'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
        category: 'full',
      },
    ];
  }

resources = [
    {
      title: 'ERP Implementation Guide',
      size: '2.4 MB',
      file: 'assets/resources/erp-guide.pdf',
    },
    {
      title: 'TinkerTek Success Metrics',
      size: '1.8 MB',
      file: 'assets/resources/tinkertek.pdf',
    },
    {
      title: 'Digital Transformation Roadmap',
      size: '3.2 MB',
      file: 'assets/resources/digital.pdf',
    },
  ];
  get filteredStudies(): CaseStudy[] {
    return this.selectedTab === 'all'
      ? this.caseStudies
      : this.caseStudies.filter((study) => study.category === this.selectedTab);
  }

  setTab(tab: string): void {
    this.selectedTab = tab;
  }
}
