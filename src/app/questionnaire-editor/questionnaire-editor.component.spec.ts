import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { QuestionnaireEditorComponent } from './questionnaire-editor.component';
import { LoginService, LoginDialog } from '../login.service';
import { QuestionnaireService } from '../questionnaire.service';

describe('QuestionnaireEditorComponent', () => {
  let component: QuestionnaireEditorComponent;
  let fixture: ComponentFixture<QuestionnaireEditorComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LoginDialog]
      }
    });

    TestBed.configureTestingModule({
      declarations: [
        QuestionnaireEditorComponent,
        LoginDialog
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
        QuestionnaireService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
