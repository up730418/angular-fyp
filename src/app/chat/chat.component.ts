import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Component, OnInit, ViewEncapsulation, Inject, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Headers,  Http, Response, RequestOptions, Request, RequestMethod} from '@angular/http';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  userName: string;
  mess: string;
  colours: Array<String>;
  userColour: {};
  private url = 'localhost';
  private messages: Array<any>;
  private socket: WebSocket;
  private room: any;

  constructor(private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              @Inject(DOCUMENT) private document: Document,
               ) {

    this.room = this.route.snapshot.params['id'];
    this.userColour = {};
    this.colours = ['red', 'blue', 'greeen', 'pink', 'orange'];
    this.messages = [];
    this.socket = new WebSocket('ws://' + this.url + ':1335/', this.room);
    this.userName = this.loginService.userName;
    this.mess = '';

   this.router.events.subscribe(event => {
     // when the room id changes, refresh model
     if (this.room !== this.route.snapshot.params['id']){
       document.getElementById('testMessage').innerHTML = '';
       this.room = this.route.snapshot.params['id'];
       this.getChatData(this.room);
       this.socket = new WebSocket('ws://' + this.url + ':1335/', this.room);

     }
   });
  }

  ngOnInit(){
    this.loginService.login.subscribe((login) => {
      if (login){
        this.getChatData(this.room);
        this.userName = this.loginService.userName;
        this.userNameChange();
       }
    });
  }


  ngAfterViewInit(){
    this.loginService.checkSignIn();
    this.getChatData(this.room);


    this.askNotification();

    this.socket.onmessage = (event) => {
        this.addMessage(JSON.parse(event.data), true);
    };
    this.socket.onclose = () => {
        console.log('/The socket connection has been closed');
    };
    this.socket.onopen = () => {
        console.log('/The socket connection has been established');
    };
  }

  addMessage(data, notifi): void {

    let cssClass = 'otherMessage';
    let colour: string;
    const commentor = data['user'];

    if (this.userName == commentor){
        cssClass = 'myMessage';
    }else{
      if (this.userColour[commentor]){
          colour = this.userColour[commentor];

      }
      else{
          colour = this.colours[Math.floor(Math.random() * this.colours.length)].toString();
          this.userColour[commentor] = colour;
      }
//      if (notifi === true && Notification.permission === "granted") {
//        // If it's okay let's create a notification
//        let notification = new Notification(`${data['user']} : \n  ${data['data']}`);
//      }
    }

    if (data.user && data.user.length > 25){
      data.user = data.user.substring(0, 25) + '...';
    }

    let className = !data['user'] ? 'anon' : data['user'];
    className = className.replace(/\s/g, '');

    if (data.data && typeof data.data == 'string' && (data.data.includes('.gif') || data.data.includes('.jpg') || data.data.includes('.png') ) ){
      //Add a gif to the chat
      const newDiv = document.createElement('div');
      const divText = document.createTextNode(`${data['user']}: \n\n`);
      const newImg = document.createElement('img');
      newImg.setAttribute('src', data['data']);
      newImg.setAttribute('alt', data['user']);
      newDiv.appendChild(divText);
      newDiv.appendChild(newImg);
      newDiv.style.backgroundColor = colour;
      newDiv.classList.add(cssClass, 'message', className);

      document.getElementById('testMessage').appendChild(newDiv);

    }
    else{
      //Add a normal text element to the chat
      const newDiv = document.createElement('div');
      const divText = document.createTextNode(`${data['user']}:`);
      const newP = document.createElement('p');
      const pText = document.createTextNode(`${data['data']}`);
      newDiv.appendChild(divText);
      newP.appendChild(pText);
      newDiv.appendChild(newP);
      newDiv.style.backgroundColor = colour;
      newDiv.classList.add(cssClass, 'message', className);

      document.getElementById('testMessage').appendChild(newDiv);

    }


    document.getElementById('testMessage').scrollTop = document.getElementById('testMessage').scrollHeight;
  }

  sendMessage(): void {
    //this.userNameChange();
    if (this.mess.trim() != ''){
      try{
        this.socket.send(JSON.stringify({message : this.mess,
                 room : this.room, user: this.userName, type: 'chat'}));
        this.mess = '';

      }catch (e){
          console.error('Unable to send message');
      }
    }
  }

  userNameChange(): void {
    //Remove all messages curently marked as the userers
    const elementsToRemove = document.querySelectorAll('.myMessage');
    for (let i = 0; i < elementsToRemove.length; i++) {
        elementsToRemove[i].classList.remove('myMessage');
        elementsToRemove[i].className += ' otherMessage';
    }

    // Assign all new users messages
    const className = '.' + this.userName.replace(/@/g, '');
    const elementsToUpdate = document.querySelectorAll(className);
    for (let i = 0; i < elementsToUpdate.length; i++) {
        elementsToUpdate[i].removeAttribute('style');
        elementsToUpdate[i].classList.remove('otherMessage');
        elementsToUpdate[i].className += ' myMessage';
    }
  }

  askNotification(): void {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      //console.log("boop")
      if (permission === 'granted') {
        //var notification = new Notification("Hi there!");
      }
      else{
        console.error(permission);
      }
    });
  }

  getChatData(room: string): Promise<string> {
//    console.log(" attempted get")
    const url = 'http://' + this.url + ':8080/api/chat/' + room;
    const headers = new Headers({ 'Content-Type': 'application/json',
                                  'Authorization': 'Bearer ' + this.loginService.authtoken });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                .toPromise()
                .then(response => {

                  const x = response.json();
                  //console.log()
                  x.reverse();
                  x.forEach((message) => {
                    this.addMessage(message, false);
                  });
                  return 'response';

                })
                .catch((e) => e.toString());
  }

}


