import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { LoginService, LoginDialog } from '../login.service';
import { LessonService } from '../lesson.service';
import { StudentReviewComponent } from '../student-review/student-review.component';

import { LessonReviewComponent } from './lesson-review.component';

describe('LessonReviewComponent', () => {
  let component: LessonReviewComponent;
  let fixture: ComponentFixture<LessonReviewComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LoginDialog]
      }
    });

    TestBed.configureTestingModule({
      declarations: [
        LessonReviewComponent,
        LoginDialog,
        StudentReviewComponent,
      ],
      imports: [
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        RouterTestingModule,
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
      providers: [
        LoginService,
        LessonService,
      ]
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
