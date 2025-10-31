import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMarqueeComponent } from './logo-marquee.component';

describe('LogoMarqueeComponent', () => {
  let component: LogoMarqueeComponent;
  let fixture: ComponentFixture<LogoMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoMarqueeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
