// about.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  leaders = [
    {
      name: 'Dr. Amit Singh',
      role: 'Founder & CEO',
      bio: '20+ years in education technology',
      initials: 'AS',
      linkedin: '#',
      twitter: '#',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Ms. Neha Gupta',
      role: 'CTO',
      bio: 'AI & ML expert with 15+ years experience',
      initials: 'NG',
      linkedin: '#',
      twitter: '#',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Mr. Vikram Patel',
      role: 'COO',
      bio: 'School operations specialist',
      initials: 'VP',
      linkedin: '#',
      twitter: '#',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  ];

  partnerSchools = [
    { name: 'Sunrise International School', image: 'assets/Company/1.png' },
    { name: 'Greenfield Academy', image: 'assets/Company/2.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/3.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/4.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/5.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/6.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/7.png' },
    { name: 'Bright Minds Public School', image: 'assets/Company/2.png' },
  ];

  stats = [
    { value: '500+', label: 'Schools Served' },
    { value: '50K+', label: 'Students Impacted' },
    { value: '30+', label: 'Countries' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  ngOnInit() {
    this.titleService.setTitle('About Us - School for Schools');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Learn about School for Schools mission to transform education through innovative ERP solutions and AI-powered learning labs.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'about school for schools, education technology company, school management solutions',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'About Us - School for Schools',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Learn about our mission to transform education through technology',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/about',
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });
  }
}
