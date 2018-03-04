import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewComponent } from './student-review.component';

describe('StudentReviewComponent', () => {
  let component: StudentReviewComponent;
  let fixture: ComponentFixture<StudentReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
