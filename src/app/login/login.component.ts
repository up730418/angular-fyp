import { Component, OnInit, Inject, ViewEncapsulation, OnChanges, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { LoginService } from '../login.service';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              public dialog: MatDialog, ) { }

  ngOnInit() {
    this.openDialog();
  }


  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: './login.componentDialog.html',
})

export class LoginDialog implements OnInit {

  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': false,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    this.loginService.user = googleUser;
    this.loginService.authtoken = googleUser.Zi.id_token;
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
