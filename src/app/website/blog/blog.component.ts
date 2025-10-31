import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  category: string;
  slug: string;
  url: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  posts: BlogPost[] = [
    {
      id: '1',
      title: 'Digital Transformation in Schools: A Complete Guide',
      excerpt:
        'Explore how schools can leverage ERP systems and AI tools to streamline operations and enhance learning experiences.',
      date: 'October 15, 2025',
      readTime: '8 min read',
      author: 'Dr. Priya Sharma',
      image: 'assets/school-management-dashboard.png',
      category: 'Education Tech',
      slug: 'digital-transformation-schools-guide',
      url: '/blog/digital-transformation-schools-guide',
    },
    {
      id: '2',
      title: 'How AI is Revolutionizing Student Learning',
      excerpt:
        'Discover the impact of AI-powered labs on student engagement and future-ready skills development.',
      date: 'October 10, 2025',
      readTime: '6 min read',
      author: 'Rajesh Kumar',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
      category: 'AI & Innovation',
      slug: 'ai-revolutionizing-student-learning',
      url: '/blog/ai-revolutionizing-student-learning',
    },
    {
      id: '3',
      title: 'Building Robotics Labs: Best Practices for Schools',
      excerpt:
        'Step-by-step guide to setting up TinkerTek Labs for hands-on STEM education.',
      date: 'October 5, 2025',
      readTime: '10 min read',
      author: 'Ms. Anita Desai',
      image: 'assets/robotics-lab-students-learning.jpg',
      category: 'STEM Education',
      slug: 'building-robotics-labs-schools',
      url: '/blog/building-robotics-labs-schools',
    },
    {
      id: '4',
      title: 'The Role of ERP in Modern School Management',
      excerpt:
        'How integrated ERP solutions can reduce administrative burdens by up to 50%.',
      date: 'September 28, 2025',
      readTime: '7 min read',
      author: 'Finance Head, Modern School',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'School Management',
      slug: 'erp-modern-school-management',
      url: '/blog/erp-modern-school-management',
    },
  ];

  ngOnInit(): void {
    this.titleService.setTitle(
      'Blog & Articles | TinkerTek Labs - Insights on EdTech & STEM Innovation'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Stay updated with the latest articles on education technology, AI in schools, robotics labs, digital transformation, and STEM education trends.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'edtech blog, AI in education articles, STEM innovation, school management insights, robotics in classroom, digital transformation schools',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Blog & Articles | TinkerTek Labs',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Explore expert insights, guides, and trends in educational technology and innovation.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/blog',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://schoolforschools.com/tinkertek/school-management-dashboard.png',
    });
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Blog | TinkerTek Labs',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Read articles on AI, robotics, and school innovation. Empower your educational journey.',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content:
        'https://schoolforschools.com/tinkertek/school-management-dashboard.png',
    });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
