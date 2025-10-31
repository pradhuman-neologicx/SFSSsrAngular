import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { CtaComponent } from '../components/cta/cta.component';

interface ResourceCard {
  icon: string;
  title: string;
  description: string;
  count: string;
  link: string;
}

interface FeaturedArticle {
  title: string;
  date: string;
  category: string;
  link: string;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, CtaComponent],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // Resources data
  resources: ResourceCard[] = [
    {
      icon: 'book-open',
      title: 'Blog & Articles',
      description:
        'Latest insights on education technology, school management, and innovation.',
      count: '25+ Articles',
      link: '/blog',
    },
    {
      icon: 'file-text',
      title: 'Whitepapers',
      description:
        'In-depth guides on digital transformation and best practices in education.',
      count: '8 Whitepapers',
      link: '/',
    },
    {
      icon: 'help-circle',
      title: 'FAQs',
      description:
        'Answers to common questions about our products and services.',
      count: 'Comprehensive',
      link: '/faq',
    },
  ];

  // Featured articles
  featured: FeaturedArticle[] = [
    {
      title: 'Digital Transformation in Schools: A Complete Guide',
      date: 'Oct 15, 2024',
      category: 'Education Tech',
      link: 'digital-transformation-schools-guide',
    },
    {
      title: 'How AI is Revolutionizing Student Learning',
      date: 'Oct 10, 2024',
      category: 'AI & Innovation',
      link: 'ai-revolutionizing-student-learning',
    },
  ];

  ngOnInit() {
    this.titleService.setTitle(
      'Resources & Learning Center | TinkerTek Labs - Educational Insights & Guides'
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore blogs, whitepapers, FAQs, and featured articles on education technology, AI in schools, digital transformation, and innovation in STEM education.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'education resources, school management blog, AI in education whitepapers, STEM articles, school ERP guides, digital transformation FAQs',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Resources & Learning Center | TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Access in-depth articles, whitepapers, and resources to stay ahead in educational innovation and school management.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/resources',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://schoolforschools.com/tinkertek/modern-classroom-tech.png',
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Resources | TinkerTek Labs',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Latest insights on edtech, AI labs, and school management. Download whitepapers and read featured articles.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content:
        'https://schoolforschools.com/tinkertek/modern-classroom-tech.png',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
