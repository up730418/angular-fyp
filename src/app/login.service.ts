import { Injectable, Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { AppConstant } from '../environments/environment';

declare const gapi: any;

@Injectable()
export class LoginService {
  public user: any;
  public authtoken: any;
  public signedIn: Boolean;
  public name: string;
  public userName: string;
  public expiresAt: number;
  public dialogeIsOpen = false;
  private serverUrl;

  @Output() login = new EventEmitter(false);

  constructor(public dialog: MatDialog,
              private http: Http, ) {
    this.serverUrl = 'http://' + AppConstant.BASE_API_URL + ':' + AppConstant.BASE_API_PORT;
    this.signedIn = false;
  }

  public checkSignIn(){
    if (this.signedIn !== true && localStorage.getItem('authToken') && new Date(parseInt(localStorage.getItem('authExpiresAt'))) > new Date()){
      this.authtoken = localStorage.getItem('authToken');
      this.signedIn = true;
      this.name = localStorage.getItem('authName');
      this.userName = localStorage.getItem('authUserName');
      this.expiresAt = parseInt(localStorage.getItem('authExpiresAt'));
      this.login.emit(this.signedIn);
    }

    if (!this.signedIn){
      this.openDialog();
    }
  }


  openDialog() {
    let dialogRef;

    if (!this.dialogeIsOpen){
      dialogRef = this.dialog.open(LoginDialog, {
      });
    }
    this.dialogeIsOpen = true;
    try{
      dialogRef.afterClosed().subscribe(result => {
        this.dialogeIsOpen = false;
        if (result){
          this.user = result;
          this.authtoken = result.Zi.id_token;
          this.signedIn = true;
          this.name = result.w3.ig;
          this.userName = result.w3.U3;
          this.expiresAt = result.Zi.expires_at;
          localStorage.setItem('authToken', result.Zi.id_token);
          localStorage.setItem('authName', result.w3.ig);
          localStorage.setItem('authUserName', result.w3.U3);
          localStorage.setItem('authExpiresAt', result.Zi.expires_at);
        }
        this.login.emit(this.signedIn);

      });

    } catch (e){
      // Do nothinng
    }
  }

  public checkUserType() {
    this.checkSignIn();
//    return "Student";
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/user/userType';

    return this.http.get(url, options)
                .toPromise()
                .then(response => response['_body'] /*"Student"*/ )
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }

}

@Component({
  selector: 'login-dialog',
  templateUrl: './login.componentDialog.html',
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
