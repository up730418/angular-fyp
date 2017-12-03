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
import { ChatComponent } from './chat/chat.component';
import { PollComponent } from './poll/poll.component';
import { PollEditorComponent } from './poll-editor/poll-editor.component';
import { WebsocketDialogueComponent } from './websocket-dialogue/websocket-dialogue.component';

import { PollService } from './poll.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PollComponent,
    PollEditorComponent,
    WebsocketDialogueComponent,
    HomeComponent
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
  providers: [PollService,],
  bootstrap: [AppComponent],
  entryComponents: [WebsocketDialogueComponent]
})
export class AppModule { }
