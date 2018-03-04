import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginService, LoginDialog } from '../login.service';
import { LessonService } from '../lesson.service';

import { StudentReviewComponent } from './student-review.component';

describe('StudentReviewComponent', () => {
  let component: StudentReviewComponent;
  let fixture: ComponentFixture<StudentReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentReviewComponent ],
      imports: [
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatButtonModule,
        MatChipsModule,
        MatCardModule,
      ],
      providers: [ LoginService,
                  LessonService, ]
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
