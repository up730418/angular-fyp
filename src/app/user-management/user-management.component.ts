import { Component, OnInit } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { AppConstant } from '../../environments/environment';

import { User } from '../modle';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  types: Array<any> = ['', 'Admin', 'Student', 'Teacher'];
  serverUrl;
  code: number;
  constructor(private loginService: LoginService,
              private http: Http, ) {
    this.serverUrl = 'http://' + AppConstant.BASE_API_URL + ':' + AppConstant.BASE_API_PORT;
  }

  ngOnInit() {
     this.loginService.login.subscribe((login) => {
      if (login){
         this.getUsers().then(users => {
            this.users = users;
          });
       }
    });
    this.loginService.checkSignIn();

    if (this.loginService.signedIn){
      this.getUsers().then(users => {
        this.users = users;
      });
    }
//    this.updateUser({userName:"up730418@myport.ac.uk", firstName: "Robert", lastName: "Wheelhouse", userType: "Admin"})
  }



  getUsers(): Promise<User[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/user/';

    return this.http.get(url, options)
                .toPromise()
                .then((response) => {
                                  if (response.status === 200){
                                    return response.json() as User[];
                                  } else {
                                    this.code = response.status;
                                  }

                                  } )
                .catch(this.handleError);
  }

  updateUser(data): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/user/';
    const body = JSON.stringify(data);

    return this.http.put(url, body, options)
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
  }

  addUser(): void {
    this.users.push(new User('', '', '', ''));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}
