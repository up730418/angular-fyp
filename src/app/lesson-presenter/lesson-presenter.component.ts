import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppConstant } from '../../environments/environment';

import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson } from './../modle';

@Component({
  selector: 'app-lesson-presenter',
  templateUrl: './lesson-presenter.component.html',
  styleUrls: ['./lesson-presenter.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LessonPresenterComponent implements OnInit {

  lesson: Lesson;
  lessonId: string;
  socket: WebSocket;
  url = AppConstant.BASE_API_URL;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private lessonService: LessonService, ) {

    this.lessonId = this.route.snapshot.params['id'];

    if (this.loginService.signedIn) {
      this.getLesson();
    }
  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login) {
         this.getLesson();
       }
    });
    //Check if user is already signed in or not
    this.loginService.checkSignIn();
    this.socket = new WebSocket('ws://' + this.url + ':1337/', this.lessonId);
    //this.quizSocket = new WebSocket('ws://' + this.url + ':1336/');
  }

  ngAfterViewInit() {

    this.socket.onmessage = (event) => {


    };
    this.socket.onclose = () => {
        console.log('/The socket connection has been closed');
        //this.openDialog();
    };
    this.socket.onopen = () => {
        console.log('/The socket connection has been established');
    };
  }
  ngOnDestroy() {
    this.socket.close(1000);
  }
  getLesson() {
    this.lessonService.getLesson(this.lessonId).then(lesson => {
          this.lesson = lesson;
        });
  }
  activatePoll(pollId) {
    this.socket.send(JSON.stringify({type: 'pollSwitch', compId: pollId, lessonId: this.lessonId}));
  }

  activateQuiz(quizId) {
    this.socket.send(JSON.stringify({type: 'quizSwitch', compId: quizId, lessonId: this.lessonId}));
  }

  endLesson() {
    this.socket.send(JSON.stringify({type: 'confidenceSwitch', compId: true, lessonId: this.lessonId}));
    this.lessonService.endLesson(this.lessonId);
  }

}
