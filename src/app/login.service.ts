import { Injectable, Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

declare const gapi: any;

@Injectable()
export class LoginService {
  public user: any;
  public authtoken: any;
  public signedIn: Boolean;
  public name: string;
  public userName: string;
  
  @Output() login = new EventEmitter(false);

  constructor(public dialog: MatDialog,) { 
    this.signedIn = false;
  }

  public checkSignIn(){
    if(!this.signedIn){
      this.openDialog();
      
    }
  }


  openDialog(): void {
      let dialogRef = this.dialog.open(LoginDialog, {
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
        if(result){
          this.user = result;
          this.authtoken = result.Zi.id_token;
          this.signedIn = true;
          this.name = result.w3.ig;
          this.userName = result.w3.U3;
        }
        this.login.emit(this.signedIn);
        
      });
    }
  
  
}

@Component({
  selector: 'login-dialog',
  templateUrl: './login/login.componentDialog.html',
})

export class LoginDialog implements OnInit {
 user: any;
  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
  ) { }

  ngOnInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 210,
        'height': 50,
        'longtitle': false,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    this.user = googleUser;
    this.dialogRef.close(googleUser);
  }
  
  onOkClick(): void {
    this.dialogRef.close(this.user);
  } 
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
