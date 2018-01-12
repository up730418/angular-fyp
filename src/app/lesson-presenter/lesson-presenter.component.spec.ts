import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from '../chat/chat.component';
import { LessonPresenterComponent } from './lesson-presenter.component';
import { LoginService, LoginDialog } from '../login.service';
import { LessonService } from '../lesson.service';

describe('LessonPresenterComponent', () => {
  let component: LessonPresenterComponent;
  let fixture: ComponentFixture<LessonPresenterComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LoginDialog]
      }
    });

    TestBed.configureTestingModule({
      declarations: [
        LessonPresenterComponent,
        ChatComponent,
        LoginDialog
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
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
      providers: [ LoginService, LessonService ]
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
