import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';
import { PollEditorComponent } from './poll-editor/poll-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'chat/:id', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'poll/:id', component: PollComponent },
  { path: 'poll-editor/:id', component: PollEditorComponent },
  
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
