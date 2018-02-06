import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { Title } from '@angular/platform-browser';
import { AppConstant } from '../environments/environment';

import { Observable } from 'rxjs/Observable';

import { Questionnaire, QAC } from './modle';


import { LoginService } from './login.service';

@Injectable()
export class QuestionnaireService {

    private serverUrl = 'http://' +  AppConstant.BASE_API_URL + ':' + AppConstant.BASE_API_PORT;

  constructor(private http: Http,
             private loginService: LoginService, ) { }

  getQuestionaire(id: string): Promise<Questionnaire> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const url = this.serverUrl + '/api/questionnaire/' + id;

    return this.http.get(url, options)
                .toPromise()
                .then(response => response.json() as Questionnaire)
                .catch(this.handleError);
  }

  updateQuestionaire(id: string, data): Promise<Questionnaire> {
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    data = JSON.stringify(data);
    const url = `${this.serverUrl}/api/questionnaire/${id}`;
    return this.http.post(url, data, options)
                .toPromise()
                .then((res) => {
      console.log(res['_body']);
      return res['_body'];
    })
                .catch(this.handleError);
  }



  deleteQuestionaire(id: number): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'text/html',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });

    const url = `${this.serverUrl}/api/questionnaire/${id}`;
    return this.http.delete(url, options)
                .toPromise()
                .then((res) => {
                        return res['_body'];
                      })
                .catch(this.handleError);
  }


  addQuestionnaireResult(id: number, data): Promise<any> {
    const url =  this.serverUrl + '/api/questionnaire/'  + id;
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(data);

    return this.http.put(url, body, options)
                .toPromise()
                .then(response => {
                  return 'success';
              })
              .catch((e) => e.toString());
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
