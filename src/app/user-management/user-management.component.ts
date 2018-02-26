import { Component, OnInit } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { AppConstant } from '../../environments/environment';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { User, TeachingClass } from '../modle';

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
  teachingClasss: TeachingClass[];
  separatorKeysCodes = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private loginService: LoginService,
              private http: Http, ) {
    this.serverUrl = 'http://' + AppConstant.BASE_API_URL + ':' + AppConstant.BASE_API_PORT;
  }

  ngOnInit() {
    if (this.loginService.signedIn){
      this.getUsers().then(users => {
        this.users = users;
      });
      this.getTeachingClass().then(teachingClass => {
        this.teachingClasss = teachingClass;
      });
    }

    this.loginService.login.subscribe((login) => {
      if (login){
         this.getUsers().then(users => {
            this.users = users;
          });
        this.getTeachingClass().then(teachingClass => {
          this.teachingClasss = teachingClass;
        });
      }
    });
    this.loginService.checkSignIn();

    }
//    this.updateUser({userName:"up730418@myport.ac.uk", firstName: "Robert", lastName: "Wheelhouse", userType: "Admin"})




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

  addUser() {
    this.users.push(new User('', '', '', ''));
  }

  getTeachingClass(): Promise<TeachingClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/teachingClass/';

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

  updateTeachingClass(data): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/teachingClass/';
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.put(url, body, options)
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
  }

  createTeachingClass(data): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/teachingClass/';
    const body = JSON.stringify(data);

    return this.http.post(url, body, options)
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
  }

  addTeachingClass() {
    const newId = this.teachingClasss[this.teachingClasss.length - 1].classId + 1;
    this.teachingClasss.push(new TeachingClass( newId, '', []));

  }
  private handleError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }

  addStudent(event: MatChipInputEvent, teachingClass: TeachingClass) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      teachingClass.students.push( value.trim() );
    }

    if (input) {
      input.value = '';
    }
  }

  removeStudent(student: any, teachingClass: TeachingClass) {
    const index = teachingClass.students.indexOf(student);

    if (index >= 0) {
      teachingClass.students.splice(index, 1);
    }
  }

}
