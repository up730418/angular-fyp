import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonReviewComponent } from './lesson-review.component';

describe('LessonReviewComponent', () => {
  let component: LessonReviewComponent;
  let fixture: ComponentFixture<LessonReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
