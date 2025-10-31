import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  inject,
  ApplicationRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
interface Slide {
  id: number;
  badge: string;
  title: string[];
  description: string;
  image: string;
  primaryCTA: string;
  secondaryCTA: string;
  stats: string[];
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'], // Optional: Add if you have SCSS/CSS file
})
export class HeroComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private appRef = inject(ApplicationRef);
  currentSlide = 0;
  mousePosition = { x: 0, y: 0 };
  private intervalId?: any;

  slides: Slide[] = [
    {
      id: 1,
      badge: 'Smart Learning Ecosystem',
      title: ['Empowering', 'Schools with', 'Technology'],
      description:
        'Transform your classrooms into dynamic learning spaces with smart tools, interactive content, and seamless management systems.',
      image: 'assets/2149507650.jpg',
      primaryCTA: 'Explore Solutions',
      secondaryCTA: 'Schedule a Demo',
      stats: [
        '500+ Schools',
        '10,000+ Students Impacted',
        'Seamless Integration',
      ],
    },
    {
      id: 2,
      badge: 'TinkerTek Innovation Labs',
      title: ['Hands-on', 'STEM ', 'Learning'],
      description:
        'Bring creativity and innovation to your school with TinkerTek Labs — where students learn robotics, AI, and engineering by doing.',
      image: 'assets/robotics-lab-students-learning.jpg',
      primaryCTA: 'Setup a Lab',
      secondaryCTA: 'View Curriculum',
      stats: ['Robotics & IoT Kits', 'STEM Aligned', 'Certified Trainers'],
    },
    
    {
      id: 3,
      badge: 'School ERP Solutions',
      title: ['Smart ERP', 'for every', 'Schools'],
      description:
        'From attendance to fee collection, our ERP solutions help schools manage everything effortlessly — all in one platform.',
      image: 'assets/school-management-dashboard.png',
      primaryCTA: 'Request a Demo',
      secondaryCTA: 'Know More',
      stats: ['Cloud-Based', 'Data Secure', 'Customizable Modules'],
    },
  ];

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

 ngOnInit() {
    // CHANGED: Delay interval until stable (SSR-safe)
    this.appRef.isStable.pipe(first(isStable => isStable)).subscribe(() => {
      this.intervalId = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    });
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // CORRECTED: Route based on currentSlide for primary CTAs
  onPrimaryCTA() {
    let route = '/contact'; // Default
    switch (this.currentSlide) {
      case 1: // Explore Solutions
        route = '/solutions';
        break;
      case 0:
      case 2: // Setup a Lab / Request a Demo
      default:
        route = '/contact';
        break;
    }
    this.router.navigate([route]);
  }

  // CORRECTED: Route based on currentSlide for secondary CTAs
  onSecondaryCTA() {
    let route: string;
    switch (this.currentSlide) {
      case 0: // View Curriculum
        route = '/curriculum';
        break;
      case 1: // Schedule a Demo
        route = '/contact';
        break;
      case 2: // Know More (ERP)
      default:
        route = '/erp';
        break;
    }
    this.router.navigate([route]);
  }

  trackBySlideId(index: number, slide: Slide): number {
    return slide.id;
  }
}