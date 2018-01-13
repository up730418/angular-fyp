import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { StudentLessonComponent } from './student-lesson.component';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';
import { PollComponent } from '../poll/poll.component';
import { ChatComponent } from '../chat/chat.component';

import { LoginService, LoginDialog } from '../login.service';
import { LessonService } from '../lesson.service';
import { PollService } from '../poll.service';

describe('StudentLessonComponent', () => {
  let component: StudentLessonComponent;
  let fixture: ComponentFixture<StudentLessonComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LoginDialog]
      }
    });

    TestBed.configureTestingModule({
      declarations: [
        StudentLessonComponent,
        ChatComponent,
        PollComponent,
        QuestionnaireComponent,
        LoginDialog
      ],
      imports: [
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ChartsModule,
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
      providers: [ LoginService, LessonService, PollService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
