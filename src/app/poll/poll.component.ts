import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';
import { WebsocketDialogueComponent } from '../websocket-dialogue/websocket-dialogue.component';

import { LoginService } from '../login.service'
import { PollService } from '../poll.service'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PollComponent implements OnInit {
  title = "Error pole does not exist or you don't have access";
  public url = "localhost"
  public messages: Array<any>;
  public socket: WebSocket;
  public pollId: any;

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

  public options:any = {
    // All of my other bar chart option here
    scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
            }
        }]
    }
    
  }

  public label: Array<any>;

  public data: Array<any>;
  
  public datasets: Array<any> = [{label: '#Votes'}];
  
  constructor(private http: Http,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private loginService: LoginService, 
              private pollService: PollService, 
              ) { 
    
    this.pollId = this.route.snapshot.params['id']; 
    this.messages = []; 
    this.socket = new WebSocket('ws://' + this.url + ':1334/', this.pollId);
    this.data = [];
    this.label = [];
  }

  ngOnInit() {
    this.loginService.checkSignIn()
    this.loginService.login.subscribe((login) => {
      if(login){
         this.getPollData(this.pollId);
       }
    });
    this.getPollData(this.pollId)
  }

  ngAfterViewInit(){
//    this.getChatData(this.room);
    
//    this.askNotification()
    this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data)
        this.pollHandler(parseInt(data.user), parseInt(data.message))
    }
    this.socket.onclose = () => {
        console.log("/The socket connection has been closed");
        this.openDialog();
    }
    this.socket.onopen = () => {
        console.log("/The socket connection has been established");
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(WebsocketDialogueComponent, {
      width: '250px',
      data: {type: "poll"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result === true) {
        window.location.reload()
      }
    });
  }

  addData(i): void {
    this.socket.send(JSON.stringify({type: "poll", vote: i, pollId: this.pollId, user: this.loginService.userName}));

  }

  addResponse(message): void{
    
  }

  pollHandler(index, votes): void {
    
    votes = votes == null ? 1 : votes; 
    //find the number of the button pressed
    let clone = JSON.parse(JSON.stringify(this.data));
    clone[index] = this.data[index] + votes;
    this.data = clone;
    console.log(this.data)
  }   

 getPollData(room: string): Promise<string> {
    const url = 'http://'+ this.url +':8080/api/poll/' + room;
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken});
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                .toPromise()
                .then(response =>{
                  let data = response.json()
                  console.log(data)
                   let questions = []
                   data.questions.forEach((question) =>{
                     this.label.push(question);
                   })

                  this.title = data.title;
                  this.label.forEach(() => this.data.push(0))
 
                  data.answers.forEach((result) =>{
                  if(result.answer){
                    this.pollHandler(parseInt(result.answer), 1);
                  }  
                  
                })
                  return 'response';
              })
              .catch((e) => {return e.toString()});
  }
  
  addPollResult(vote: string) {

    const data = {type: "poll", vote: vote.toString(), pollId: this.pollId, user: this.loginService.userName}
    this.pollService.updatePoll(this.pollId, data);
  }
  
}
