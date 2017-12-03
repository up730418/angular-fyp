import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Poll, UA } from './modle';

@Injectable()
export class PollService {
  
  private serverUrl = 'http://localhost:8080';
  
  constructor(private http: Http) { }
  
  getPoll(id: string): Promise<Poll> {
    const url = this.serverUrl + "/api/poll/" + id;

    return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Poll)
                .catch(this.handleError);
  }

  updatePoll(id: string, data): Promise<Poll> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    data = JSON.stringify(data);
    const url = `${this.serverUrl}/api/poll/${id}`;
    return this.http.post(url, data)
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
