import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule, MatToolbarModule, MatIconModule, MatSidenavModule,
        MatListModule, MatButtonToggleModule, MatDialogModule, MatButtonModule,
        MatChipsModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { LessonService } from './lesson.service';
import { PollService } from './poll.service';
import { LoginService, LoginDialog } from './login.service';
import { QuestionnaireService } from './questionnaire.service';

import { WebsocketDialogueComponent } from './websocket-dialogue/websocket-dialogue.component';

import { ChatComponent } from './chat/chat.component';
import { PollComponent } from './poll/poll.component';
import { PollEditorComponent } from './poll-editor/poll-editor.component';
import { HomeComponent } from './home/home.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonPresenterComponent } from './lesson-presenter/lesson-presenter.component';
import { StudentLessonComponent } from './student-lesson/student-lesson.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireEditorComponent } from './questionnaire-editor/questionnaire-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PollComponent,
    PollEditorComponent,
    WebsocketDialogueComponent,
    LoginDialog,
    HomeComponent,
    LessonsComponent,
    LessonComponent,
    LessonPresenterComponent,
    StudentLessonComponent,
    QuestionnaireComponent,
    QuestionnaireEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
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
  providers: [PollService,
              LoginService,
              LessonService,
              QuestionnaireService, ],

  bootstrap: [AppComponent],

  entryComponents: [WebsocketDialogueComponent,
                   LoginDialog, ]
})
export class AppModule { }
