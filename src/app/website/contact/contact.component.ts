// contact.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../components/Footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Contact Us - School for Schools');
    this.meta.updateTag({
      name: 'description',
      content:
        "Get in touch with us for any inquiries or to learn more about our services. We're here to help you succeed in the educational world.",
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'contact us, inquiries, educational services, school management, curriculum development, administrative tools, educator training',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Contact Us - School for Schools',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Get in touch with us for any inquiries or to learn more about our services. We're here to help you succeed in the educational world.",
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://schoolforschools.com/assets/2149507650.jpg',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://schoolforschools.com/contact',
    });
  }

  faqs = [
    {
      title: 'How do I get started?',
      description:
        "Simply contact us through this form or give us a call. We'll schedule a consultation to understand your needs.",
    },
    {
      title: 'What services do you offer?',
      description:
        'We provide comprehensive solutions including curriculum development, administrative tools, and educator training.',
    },
    {
      title: 'What is the pricing?',
      description:
        "We offer flexible pricing based on your school's size and needs. Contact us for a custom quote.",
    },
    {
      title: 'Do you offer support?',
      description:
        'Yes! We provide 24/7 support through email and phone, plus dedicated account managers for all clients.',
    },
  ];

  formData = {
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    subject: '',
    message: '',
  };

  handleSubmit(event: Event): void {
    event.preventDefault();
    // Simulate toast notification - in real app, use a toast service
    alert(
      "Message Sent!\nThank you for contacting us. We'll get back to you soon."
    );
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      schoolName: '',
      subject: '',
      message: '',
    };
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
