import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Lesson, } from './modle';

import { LoginService } from './login.service'

@Injectable()
 
export class LessonService {
  
  private serverUrl = 'http://localhost:8080';
  
  constructor(private http: Http,
             private loginService: LoginService,) { }
  
  getLesson(id: string): Promise<Lesson> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + "/api/lesson/" + id;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Lesson)
                .catch(this.handleError);
  }
  
  getLessons(): Promise<Lesson[]> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + "/api/lesson";

    return this.http.get(url, options)
                .toPromise()
                .then(response => { return response.json() as Lesson[] })
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
      console.log(res['_body'])
      return res['_body']
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
      console.log(res['_body'])
      return res['_body']
    })
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
