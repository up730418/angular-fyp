import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { Title } from '@angular/platform-browser';
import { AppConstant } from '../environments/environment';

import { Observable } from 'rxjs/Observable';

import { Lesson, Poll, Questionnaire } from './modle';

import { LoginService } from './login.service';

@Injectable()

export class LessonService {

  private serverUrl;

  constructor(private http: Http,
             private loginService: LoginService, ) {
    this.serverUrl = 'http://' + AppConstant.BASE_API_URL + ':' + AppConstant.BASE_API_PORT;
  }

  getLesson(id: string): Promise<Lesson> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson/' + id;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Lesson)
                .catch(this.handleError);
  }

  getLessons(): Promise<Lesson[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson';

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Lesson[])
                .catch(this.handleError);
  }
  
  getStudentLessons(): Promise<Lesson[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson/studentLessons';

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Lesson[])
                .catch(this.handleError);
  }

  getPolls(lessonId: string): Promise<Poll[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson/polls/' + lessonId;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Poll[])
                .catch(this.handleError);
  }

  getQuestionnairs(lessonId: string): Promise<Questionnaire[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson/questionnairs/' + lessonId;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Questionnaire[])
                .catch(this.handleError);
  }

  updateLesson(id: string, data): Promise<Lesson> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    data = JSON.stringify(data);
    const url = `${this.serverUrl}/api/lesson/${id}`;
    return this.http.post(url, data, options)
                .toPromise()
                .then((res) => {
      console.log(res['_body']);
      return res['_body'];
    })
                .catch(this.handleError);
  }

  deleteLesson(id: number): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'text/html',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });

    const url = `${this.serverUrl}/api/lesson/${id}`;
    return this.http.delete(url, options)
                .toPromise()
                .then((res) => {
      return res['_body'];
    })
                .catch(this.handleError);
  }
  
  saveConfidence(data): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    data = JSON.stringify(data);
    const url = `${this.serverUrl}/api/lesson/confidence`;
    return this.http.post(url, data,  options)
                .toPromise()
                .then((res) => {
      return res['_body'];
    })
                .catch(this.handleError);
  }  
  
  endLesson(lessonId): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({lessonId: lessonId});
    const url = `${this.serverUrl}/api/lesson/endLesson/${lessonId}`;
    
    return this.http.post(url, data, options)
                .toPromise()
                .then((res) => {
      return res['_body'];
    })
                .catch(this.handleError);
  }
  
   getConfidence(lessonId: string): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/lesson/confidence/' + lessonId;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
  }



  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }
  private handleError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }

}
