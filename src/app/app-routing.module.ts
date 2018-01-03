import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ChatComponent } from './chat/chat.component';

import { PollComponent } from './poll/poll.component';
import { PollEditorComponent } from './poll-editor/poll-editor.component';

import { LessonsComponent } from './lessons/lessons.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'poll/:id', component: PollComponent },
  { path: 'poll-editor/:id', component: PollEditorComponent },
  { path: 'poll-editor/:id/:lesson', component: PollEditorComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'lessons/:id', component: LessonsComponent },

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
