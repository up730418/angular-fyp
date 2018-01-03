import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPresenterComponent } from './lesson-presenter.component';

describe('LessonPresenterComponent', () => {
  let component: LessonPresenterComponent;
  let fixture: ComponentFixture<LessonPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
