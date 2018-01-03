import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Poll, UA } from './modle';


import { LoginService } from './login.service'

@Injectable()
export class PollService {
  
  private serverUrl = 'http://localhost:8080';
  
  constructor(private http: Http,
             private loginService: LoginService,) { }
  
  getPoll(id: string): Promise<Poll> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + "/api/poll/" + id;

    return this.http.get(url, options)
                .toPromise()
                .then(response =>{console.log(response.json())
                                 return response.json() as Poll})
                .catch(this.handleError);
  }

  updatePoll(id: string, data): Promise<Poll> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    data = JSON.stringify(data);
    const url = `${this.serverUrl}/api/poll/${id}`;
    return this.http.post(url, data, options)
                .toPromise()
                .then((res) => {
      console.log(res['_body'])
      return res['_body']
    })
                .catch(this.handleError);
  }
  
  addPollResult(id: number, data): Promise<any> {
    const url =  this.serverUrl + '/api/poll/'  + id;
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(data);
                         
    return this.http.put(url, body, options)
                .toPromise()
                .then(response =>{
                  return 'success';
              })
              .catch((e) => {return e.toString()});
  }
    
  
  deletePoll(id: number): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'text/html',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    
    const url = `${this.serverUrl}/api/poll/${id}`;
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
