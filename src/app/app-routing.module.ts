import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StudentHomeComponent } from './student-home/student-home.component';

import { ChatComponent } from './chat/chat.component';

import { PollComponent } from './poll/poll.component';
import { PollEditorComponent } from './poll-editor/poll-editor.component';

import { LessonsComponent } from './lessons/lessons.component';
import { LessonPresenterComponent } from './lesson-presenter/lesson-presenter.component';
import { LessonReviewComponent } from './lesson-review/lesson-review.component';

import { StudentLessonComponent } from './student-lesson/student-lesson.component';
import { StudentReviewComponent } from './student-review/student-review.component';

import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireEditorComponent } from './questionnaire-editor/questionnaire-editor.component';

import { UserManagementComponent } from './user-management/user-management.component';

import { UserTeacherGuard } from './guards/user-teacher.guard';
import { UserEntryGuard } from './guards/user-entry.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [UserEntryGuard] },
  { path: 'home/:id', component: HomeComponent },
  { path: 'student-home', component: StudentHomeComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'poll/:id', component: PollComponent },
  { path: 'poll-editor/:id', component: PollEditorComponent, canActivate: [UserTeacherGuard] },
  { path: 'poll-editor/:id/:lesson', component: PollEditorComponent, canActivate: [UserTeacherGuard] },
  { path: 'lessons', component: LessonsComponent, canActivate: [UserTeacherGuard] },
  { path: 'lessons/:id', component: LessonsComponent, canActivate: [UserTeacherGuard] },
  { path: 'lesson-presenter/:id', component: LessonPresenterComponent, canActivate: [UserTeacherGuard] },
  { path: 'lesson-review/:id', component: LessonReviewComponent, canActivate: [UserTeacherGuard] /*Strange bug here..*/},
  { path: 'student-lesson/:id', component: StudentLessonComponent },
  { path: 'student-review', component: StudentReviewComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent },
  { path: 'questionnaire-editor/:id', component: QuestionnaireEditorComponent, canActivate: [UserTeacherGuard] },
  { path: 'questionnaire-editor/:id/:lesson', component: QuestionnaireEditorComponent, canActivate: [UserTeacherGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [UserTeacherGuard] },

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
