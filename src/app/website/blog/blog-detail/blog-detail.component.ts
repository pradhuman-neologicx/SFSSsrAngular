import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../components/Footer/footer.component';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  category: string;
  content: string;
  tags: string[];
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);

  post: BlogPost | null = null;
  safeHtml: SafeHtml = '';

  posts: Record<string, BlogPost> = {
    'digital-transformation-schools-guide': {
      title: 'Digital Transformation in Schools: A Complete Guide',
      excerpt:
        'Explore how schools can leverage ERP systems and AI tools to streamline operations and enhance learning experiences.',
      date: 'October 15, 2025',
      readTime: '8 min read',
      author: 'Dr. Priya Sharma',
      image: 'assets/modern-classroom-tech.png',
      category: 'Education Tech',
      content: `
        <h2>Introduction to Digital Transformation in Education</h2>
        <p>In today's rapidly evolving educational landscape, digital transformation has transitioned from being a mere buzzword to an absolute necessity for modern educational institutions. Schools and universities worldwide are embracing digital technologies to enhance learning experiences, streamline administrative processes, and prepare students for a technology-driven future. This comprehensive guide explores how educational institutions can effectively implement digital transformation strategies to stay ahead in the 21st century.</p>
        
        <h3>Understanding Digital Transformation in Education</h3>
        <p>Digital transformation in education refers to the integration of digital technology into all areas of educational institutions, fundamentally changing how they operate and deliver value to students, teachers, and administrators. This transformation goes beyond simply digitizing existing processes; it's about reimagining education in the digital age.</p>
        
        <h3>Key Components of Digital Transformation</h3>
        <ul>
          <li><strong>Cloud Computing:</strong> Enables anytime, anywhere access to educational resources and collaboration tools.</li>
          <li><strong>Learning Management Systems (LMS):</strong> Centralized platforms for course content, assignments, and student progress tracking.</li>
          <li><strong>Artificial Intelligence:</strong> Personalized learning experiences and automated administrative tasks.</li>
          <li><strong>Data Analytics:</strong> Insights into student performance and institutional effectiveness.</li>
          <li><strong>Mobile Learning:</strong> Education that extends beyond the classroom walls.</li>
        </ul>
        
        <h2>The Role of ERP Systems in Modern Education</h2>
        <p>Enterprise Resource Planning (ERP) systems have become the backbone of digital transformation in educational institutions. These comprehensive platforms integrate various school functions into a single, unified system, providing numerous benefits:</p>
        
        <h3>Streamlined Administrative Processes</h3>
        <p>ERP systems automate routine administrative tasks such as admissions, attendance tracking, and fee management. This automation reduces manual work, minimizes errors, and allows staff to focus on more strategic initiatives that enhance the educational experience.</p>
        
        <h3>Enhanced Communication</h3>
        <p>Modern ERP solutions include robust communication portals that connect teachers, students, and parents. These platforms facilitate real-time updates, assignment submissions, and progress tracking, creating a more engaged educational community.</p>
        
        <h3>Data-Driven Decision Making</h3>
        <p>With comprehensive reporting and analytics tools, educational leaders can make informed decisions based on real-time data. From student performance metrics to resource allocation, ERP systems provide the insights needed for continuous improvement.</p>
        
        <h3>Financial Management</h3>
        <p>Educational institutions can efficiently manage budgets, payroll, and expenses through integrated financial modules. This transparency ensures better financial planning and resource allocation.</p>
        
        <h2>Implementing Digital Transformation: Best Practices</h2>
        <p>Successfully implementing digital transformation requires careful planning and execution. Here are key strategies for educational institutions:</p>
        
        <h3>1. Develop a Clear Vision and Strategy</h3>
        <p>Define clear objectives for digital transformation that align with your institution's educational goals. Establish measurable outcomes and key performance indicators (KPIs) to track progress.</p>
        
        <h3>2. Invest in Professional Development</h3>
        <p>Ensure that teachers and staff receive adequate training to effectively use new technologies. Continuous professional development is crucial for successful adoption.</p>
        
        <h3>3. Prioritize Cybersecurity</h3>
        <p>With increased digitalization comes greater cybersecurity risks. Implement robust security measures to protect sensitive student and institutional data.</p>
        
        <h3>4. Foster a Culture of Innovation</h3>
        <p>Encourage experimentation and innovation among staff and students. Create an environment where new ideas are welcomed and tested.</p>
        
        <h3>5. Ensure Accessibility and Inclusivity</h3>
        <p>Digital transformation should benefit all students. Ensure that all digital tools and platforms are accessible to students with disabilities and those from diverse backgrounds.</p>
        
        <h2>The Future of Digital Education</h2>
        <p>As technology continues to evolve, educational institutions must remain agile and adaptable. Emerging technologies like artificial intelligence, virtual reality, and blockchain are set to further transform the educational landscape. By embracing digital transformation today, schools can prepare students for the challenges and opportunities of tomorrow's digital world.</p>
      `,
      tags: ['ERP', 'Digital Transformation', 'School Management'],
    },
    'ai-revolutionizing-student-learning': {
      title: 'How AI is Revolutionizing Student Learning',
      excerpt:
        'Discover the impact of AI-powered labs on student engagement and future-ready skills development.',
      date: 'October 10, 2025',
      readTime: '6 min read',
      author: 'Rajesh Kumar',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
      category: 'AI & Innovation',
      content: `
        <h2>The Dawn of AI in Education: A New Era of Learning</h2>
        <p>Artificial Intelligence (AI) is revolutionizing the educational landscape, transforming traditional classrooms from passive learning environments into dynamic, interactive spaces that cater to individual student needs. This comprehensive guide explores how AI is reshaping education and what it means for students, educators, and institutions.</p>
        
        <h3>Understanding AI in Education</h3>
        <p>AI in education refers to the use of machine learning algorithms and computational intelligence to enhance teaching and learning experiences. These technologies can analyze vast amounts of data to provide personalized learning paths, automate administrative tasks, and offer real-time feedback to both students and educators.</p>
        
        <h2>Key Applications of AI in Modern Classrooms</h2>
        
        <h3>1. Personalized Learning Experiences</h3>
        <p>AI-powered platforms can analyze individual learning patterns and adapt content accordingly. These systems can:</p>
        <ul>
          <li>Identify knowledge gaps and suggest targeted exercises</li>
          <li>Adjust difficulty levels based on student performance</li>
          <li>Provide customized learning paths for each student</li>
          <li>Offer immediate feedback and explanations</li>
        </ul>
        
        <h3>2. Intelligent Tutoring Systems</h3>
        <p>AI tutors provide students with personalized assistance outside the classroom. These systems can:</p>
        <ul>
          <li>Answer student questions in natural language</li>
          <li>Provide step-by-step problem-solving guidance</li>
          <li>Offer 24/7 academic support</li>
          <li>Track progress and adjust teaching methods accordingly</li>
        </ul>
        
        <h3>3. Automated Grading and Assessment</h3>
        <p>AI can significantly reduce the grading burden on educators by:</p>
        <ul>
          <li>Automatically grading multiple-choice and fill-in-the-blank tests</li>
          <li>Analyzing written responses using natural language processing</li>
          <li>Providing detailed feedback on assignments</li>
          <li>Identifying patterns in student performance</li>
        </ul>
        
        <h3>4. Enhanced Student Engagement</h3>
        <p>AI-powered tools are making learning more engaging through:</p>
        <ul>
          <li>Gamification elements that motivate students</li>
          <li>Interactive simulations and virtual labs</li>
          <li>Adaptive learning games that adjust to skill levels</li>
          <li>Virtual and augmented reality experiences</li>
        </ul>
        
        <h2>Benefits of AI in Education</h2>
        
        <h3>1. Improved Learning Outcomes</h3>
        <p>AI enables personalized learning at scale, helping students learn at their own pace and in ways that suit their individual learning styles. This personalization leads to better understanding and retention of material.</p>
        
        <h3>2. Increased Accessibility</h3>
        <p>AI tools can make education more accessible to students with disabilities through features like speech-to-text, text-to-speech, and language translation services.</p>
        
        <h3>3. Teacher Support and Professional Development</h3>
        <p>AI doesn't replace teachers but rather enhances their capabilities by:</p>
        <ul>
          <li>Handling administrative tasks</li>
          <li>Providing insights into student performance</li>
          <li>Suggesting teaching strategies based on class data</li>
          <li>Identifying students who may need additional support</li>
        </ul>
        
        <h3>4. Data-Driven Decision Making</h3>
        <p>Educational institutions can use AI to analyze vast amounts of data to:</p>
        <ul>
          <li>Identify at-risk students early</li>
          <li>Optimize curriculum design</li>
          <li>Allocate resources more effectively</li>
          <li>Measure the impact of teaching methods</li>
        </ul>
        
        <h2>Challenges and Considerations</h2>
        <p>While AI offers numerous benefits, it's important to address potential challenges:</p>
        
        <h3>1. Data Privacy and Security</h3>
        <p>Protecting student data is paramount. Institutions must implement robust security measures and ensure compliance with data protection regulations.</p>
        
        <h3>2. Equity and Access</h3>
        <p>There's a risk of widening the digital divide. Schools must ensure all students have equal access to AI-powered tools and resources.</p>
        
        <h3>3. Teacher Training</h3>
        <p>Effective integration of AI requires proper training and professional development for educators.</p>
        
        <h3>4. Ethical Considerations</h3>
        <p>AI systems must be developed and used ethically, with attention to bias, fairness, and transparency.</p>
        
        <h2>The Future of AI in Education</h2>
        <p>As AI technology continues to advance, we can expect even more innovative applications in education, including:</p>
        <ul>
          <li>More sophisticated adaptive learning systems</li>
          <li>Immersive learning experiences with VR and AR</li>
          <li>Predictive analytics for early intervention</li>
          <li>AI-powered career counseling and guidance</li>
        </ul>
        
        <p>By embracing AI in education, we can create more effective, engaging, and personalized learning experiences that prepare students for the challenges of the 21st century.</p>
      `,
      tags: ['AI', 'Student Engagement', 'Personalized Learning'],
    },
  };

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug && this.posts[slug]) {
      this.post = this.posts[slug];
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
      this.titleService.setTitle(`${this.post.title} | TinkerTek Labs Blog`);
      this.updateMetaTags();
    }
  }

  updateMetaTags(): void {
    if (this.post) {
      this.metaService.updateTag({
        name: 'description',
        content: this.post.excerpt,
      });
      this.metaService.updateTag({
        name: 'keywords',
        content: this.post.tags.join(', ') + ', edtech, STEM, innovation',
      });
      this.metaService.updateTag({
        property: 'og:title',
        content: this.post.title,
      });
      this.metaService.updateTag({
        property: 'og:description',
        content: this.post.excerpt,
      });
      this.metaService.updateTag({
        property: 'og:image',
        content: this.post.image,
      });
      this.metaService.updateTag({
        name: 'twitter:title',
        content: this.post.title,
      });
      this.metaService.updateTag({
        name: 'twitter:description',
        content: this.post.excerpt,
      });
      this.metaService.updateTag({
        name: 'twitter:image',
        content: this.post.image,
      });
      this.metaService.updateTag({
        name: 'robots',
        content: 'index, follow',
      });
    }
  }
}
