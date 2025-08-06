import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerTestManagementComponent } from './engineer-test-management.component';

describe('EngineerTestManagementComponent', () => {
  let component: EngineerTestManagementComponent;
  let fixture: ComponentFixture<EngineerTestManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngineerTestManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerTestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
