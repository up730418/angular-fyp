import { Component, Inject, ViewEncapsulation } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButton} from '@angular/material';

@Component({
  selector: 'app-websocket-dialogue',
  templateUrl: './websocket-dialogue.component.html',
  styleUrls: ['./websocket-dialogue.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WebsocketDialogueComponent {
  
 constructor(
    public dialogRef: MatDialogRef<WebsocketDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
