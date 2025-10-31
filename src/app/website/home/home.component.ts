// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';
import { ChatbotWidgetComponent } from '../components/chatbot-widget/chatbot-widget.component';
import { LogoMarqueeComponent } from '../components/logo-marquee/logo-marquee.component';
import { CtaComponent } from '../components/cta/cta.component';
import { HeroComponent } from '../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    ChatbotWidgetComponent,
    LogoMarqueeComponent,
    CtaComponent,
    HeroComponent,
      
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}
  ngOnInit(): void {
    this.title.setTitle('School for Schools - Transforming Education Together');
    this.meta.updateTag({
      name: 'description',
      content:
        'Empowering schools with comprehensive ERP systems, AI-powered learning labs, and innovative educational technology solutions. Transform your school with School for Schools.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'school management system, ERP for schools, TinkerTek Labs, AI education, robotics labs, school administration software, student information system, educational technology, school ERP India',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'School for Schools - Transforming Education Together',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Comprehensive school management ERP and innovative TinkerTek Labs combining AI, robotics, and hands-on learning. Empowering schools with cutting-edge technology.',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://schoolforschools.com/assets/2149507650.jpg',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'School for Schools - Transforming Education Together',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'Comprehensive school management ERP and innovative TinkerTek Labs for modern education.',
    });
  }
  bannerImg = 'assets/2149507650.jpg';
  erpImg = 'assets/school-management-dashboard.png';
  tinkerImg = 'assets/robotics-lab-students-learning.jpg';

  whySfsItems = [
    {
      icon: 'assets/svgs_collection/barChart.svg',
      title: 'Comprehensive ERP',
      description:
        'Streamline all school operations from admissions to alumni management',
    },
    {
      icon: 'assets/svgs_collection/lightbulb.svg',
      title: 'AI & Innovation',
      description:
        'Empower students with AI, robotics, and innovation challenges',
    },
    {
      icon: 'assets/svgs_collection/users.svg',
      title: 'Expert Support',
      description:
        'Dedicated team to ensure smooth implementation and ongoing success',
    },
    {
      icon: 'assets/svgs_collection/zap.svg',
      title: 'Future Ready',
      description:
        'Stay ahead with continuous updates and emerging technologies',
    },
  ];

  offerings = [
    {
      img: this.erpImg,
      alt: 'ERP Dashboard',
      title: 'School ERP System',
      description:
        'Complete school management solution covering academics, finance, and more.',
      features: [
        'Student Information Management',
        'Academic Planning & Scheduling',
        'Financial Management',
        'AI-Powered Chatbot Support',
      ],
      link: '/erp',
      linkText: 'Explore ERP',
    },
    {
      img: this.tinkerImg,
      alt: 'TinkerTek Labs',
      title: 'TinkerTek Labs',
      description:
        'Innovative learning programs combining AI, robotics, and hands-on experimentation.',
      features: [
        'AI & Machine Learning Programs',
        'Robotics & Automation Labs',
        'Innovation Challenges',
        'E-Commerce Kits & Resources',
      ],
      link: '/tinkertek',
      linkText: 'Explore TinkerTek',
    },
  ];

 testimonials = [
  {
    quote:
      'The ERP system has completely transformed how we manage our school. Administrative tasks that used to take hours now take minutes. Our teachers can focus more on teaching and less on paperwork.',
    name: 'Dr. Priya Sharma',
    role: 'Principal',
    school: 'Delhi Public School, Bangalore',
  },
  {
    quote:
      "Parent communication has improved dramatically. They can now track their child's progress in real-time and feel more connected to the school. The mobile app is a game-changer.",
    name: 'Rajesh Kumar',
    role: 'Academic Director',
    school: 'Ryan International School, Mumbai',
  },
  {
    quote:
      "The financial module has made fee collection and accounting so much easier. We've seen a 40% reduction in payment delays and our financial reporting is more accurate than ever.",
    name: 'Meera Patel',
    role: 'Finance Manager',
    school: 'Kendriya Vidyalaya, Pune',
  },
  {
    quote:
      "The attendance tracking and report generation tools have saved us countless hours every week. Our staff now spends more time on student engagement rather than manual record keeping.",
    name: 'Anil Verma',
    role: 'Vice Principal',
    school: 'Amity International School, Noida',
  },
  {
    quote:
      "The analytics dashboard gives us valuable insights into student performance and staff efficiency. Data-driven decisions are now a core part of our management strategy.",
    name: 'Sneha Gupta',
    role: 'Head of Academics',
    school: 'The Heritage School, Gurgaon',
  },
  {
    quote:
      "From admissions to examinations, everything is streamlined. Parents, teachers, and administrators are finally on the same page — literally and figuratively.",
    name: 'Arun Menon',
    role: 'School Administrator',
    school: 'St. Joseph’s Convent High School, Kochi',
  },
  {
    quote:
      "The ERP’s integration with our existing systems was seamless. The support team was incredibly responsive and ensured a smooth transition for all departments.",
    name: 'Nisha Reddy',
    role: 'IT Coordinator',
    school: 'Oakridge International School, Hyderabad',
  },
  {
    quote:
      "Managing multiple campuses has never been this easy. The centralized dashboard lets us monitor everything from one place, saving us time and resources.",
    name: 'Ravi Iyer',
    role: 'Director of Operations',
    school: 'Podar Education Network, Mumbai',
  },
];


  trackByFn(index: number): number {
    return index;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
