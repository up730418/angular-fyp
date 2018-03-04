import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { Observable } from 'rxjs/Observable';
import { Input, Injectable, EventEmitter, Attribute, Component, OnInit, OnChanges, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AppConstant } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { WebsocketDialogueComponent } from '../websocket-dialogue/websocket-dialogue.component';

import { LoginService } from '../login.service';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class PollComponent implements OnInit {
  title = 'Error pole does not exist or you don\'t have access';
  public url = AppConstant.BASE_API_URL;
  public messages: Array<any>;
  public socket: WebSocket;
  public pollId: any;
  public dialogueIsOpen = false;
  @Input() pollid; //Id pased in component def e.g. <app-poll pollid="15">

  public colors: Array<any> = [
    { // Blue
      backgroundColor: 'rgba(63, 81, 181, 0.9)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // green
      backgroundColor: 'rgba(8, 137, 38, 0.65)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Red
      backgroundColor: 'rgba(201, 20, 20, 0.71)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public options: any = {
    // All of my other bar chart option here
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
            }
        }]
    }

  };

  public label: Array<any>;

  public data: Array<any>;

  public datasets: Array<any> = [{label: '#Votes'}];

  constructor(private http: Http,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private loginService: LoginService,
              private pollService: PollService,
              ) {

    this.messages = [];
    this.data = [];
    this.label = [];
  }

  ngOnInit() {
    //Check if pollid is defined in comp def. If not use url params
    this.pollId = this.pollid ? this.pollid : this.route.snapshot.params['id'];

    this.loginService.login.subscribe((login) => {
      if (login && this.label === []){
         this.getPollData(this.pollId);
       }
    });
    this.loginService.checkSignIn();
    this.getPollData(this.pollId);
    this.socket = new WebSocket('ws://' + this.url + ':1334/', this.pollId);
  }

  ngAfterViewInit(){
//    this.getChatData(this.room);

//    this.askNotification()
    this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.pollHandler(parseInt(data.user), parseInt(data.message));
    };
    this.socket.onclose = () => {
        this.openDialog();
    };
    this.socket.onopen = () => {
    };
  }

  openDialog() {

    const dialogRef = this.dialog.open(WebsocketDialogueComponent, {
      width: '250px',
      data: {type: 'poll'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogueIsOpen = false;
      if (result === true) {
        window.location.reload();
      }
    });
  }

  addData(i) {
    this.socket.send(JSON.stringify({type: 'poll', vote: i, pollId: this.pollId, user: this.loginService.userName}));

  }

  addResponse(message){

  }

  pollHandler(index, votes) {

    votes = votes == null ? 1 : votes;
    //find the number of the button pressed
    const clone = JSON.parse(JSON.stringify(this.data));
    clone[index] = this.data[index] + votes;
    this.data = clone;
  }

 getPollData(room: string): Promise<string> {

   const url = 'http://' + this.url + ':8080/api/poll/' + room;
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                .toPromise()
                .then(response => {
                  const data = response.json();
                   const questions = [];
                   data.questions.forEach((question) => {
                     this.label.push(question);
                   });

                  this.title = data.title;
                  this.label.forEach(() => this.data.push(0));

                  data.answers.forEach((result) => {
                  if (result.answer){
                    this.pollHandler(parseInt(result.answer), 1);
                  }

                });
                  return 'response';
              })
              .catch((e) => e.toString());
  }

  addPollResult(vote: string) {

    const data = {type: 'poll', vote: vote.toString(), pollId: this.pollId, user: this.loginService.userName};
    this.pollService.addPollResult(this.pollId, data);
  }

}
