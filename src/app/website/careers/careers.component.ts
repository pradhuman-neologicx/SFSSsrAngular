import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FooterComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent  implements OnInit  {

   private titleService = inject(Title);
   private metaService = inject(Meta);
 
 ngOnInit(): void {
    // 🧠 SEO Meta Tags 
    this.titleService.setTitle(
      'Careers | TinkerTek Labs - Join Our Team in AI, Robotics & Innovation'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore exciting career opportunities at TinkerTek Labs. Join our team as AI instructors, software engineers, robotics trainers, and more to transform STEM education and empower students worldwide.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'careers, jobs, AI instructor, robotics trainer, software engineer, full stack developer, customer success, STEM education careers, innovation jobs',
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Careers | TinkerTek Labs - Join Our Team',
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Be part of a mission-driven team revolutionizing education through AI, robotics, and hands-on innovation programs.',
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/tinkertek/careers',
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://schoolforschools.com/tinkertek/15861.jpg',
    });

    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Careers | TinkerTek Labs',
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Open positions in AI, robotics, engineering, and support. Help shape the future of education.',
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://schoolforschools.com/tinkertek/15861.jpg',
    });

    this.metaService.updateTag({
      name: 'robots',
      content: 'index, follow',
    });
  }

  jobCategories = [
    {
      icon: '👩‍🏫',
      title: 'Teaching & Training',
      description: 'Join our team of educators and trainers.',
      roles: ['AI Instructors', 'Robotics Trainers', 'Curriculum Designers']
    },
    {
      icon: '💼',
      title: 'Technical Roles',
      description: 'Help build and maintain our technology platform.',
      roles: ['Software Engineers', 'DevOps Engineers', 'QA Engineers']
    },
    {
      icon: '💡',
      title: 'Support & Operations',
      description: 'Provide excellent support to our school partners.',
      roles: ['Customer Success', 'Implementation Specialists', 'Support Engineers']
    }
  ];

  openPositions = [
    { title: 'Senior AI Instructor', location: 'Delhi', type: 'Full-time' },
    { title: 'Robotics Lab Manager', location: 'Mumbai', type: 'Full-time' },
    { title: 'Full Stack Developer', location: 'Bangalore', type: 'Full-time' },
    { title: 'Customer Success Manager', location: 'Remote', type: 'Full-time' }
  ];
}
