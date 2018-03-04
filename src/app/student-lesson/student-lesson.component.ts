import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConstant } from '../../environments/environment';
import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson } from './../modle';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './student-lesson.component.html',
  styleUrls: ['./student-lesson.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentLessonComponent implements OnInit {

  lesson: Lesson;
  lessonId: string;
  socket;
  url = AppConstant.BASE_API_URL;
  confidenceSlider: number;
  showConfidenceBar: boolean;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private lessonService: LessonService,
              @Inject(DOCUMENT) private document: Document, ) {

    this.loginService.checkSignIn();
    this.lessonId = this.route.snapshot.params['id'];
//    this.showConfidenceBar = true;
    if (this.loginService.signedIn){
      this.getLesson();
    }
  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login){
         this.getLesson();
       }
    });
    //Check if user is already signed in or not
    this.loginService.checkSignIn();
    this.socket = new WebSocket('ws://' + this.url + ':1337/', this.lessonId);
  }

  ngAfterViewInit(){

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type == 'pollSwitch') {
        this.activatePoll(data.compId);
      }
      if (data.type == 'quizSwitch') {
        this.activateQuiz(data.compId);
      }if (data.type == 'confidenceSwitch') {
        this.showConfidenceBar = true;
      }
    };
    this.socket.onclose = () => {
        console.log('/The socket connection has been closed');
        //this.openDialog();
    };
    this.socket.onopen = () => {
        console.log('/The socket connection has been established');
    };
  }

  getLesson() {
    this.lessonService.getLesson(this.lessonId).then(lesson => {
          this.lesson = lesson;
        });
  }
  activatePoll(pollId) {
    console.log(pollId);
    const hidden = document.getElementById('poll-' + pollId).classList.contains('hidden');

    if (hidden){
      document.getElementById('poll-' + pollId).classList.remove('hidden');

    } else {
      document.getElementById('poll-' + pollId).classList.add('hidden');

    }
  }

  activateQuiz(quizId) {
    const hidden = document.getElementById('quiz-' + quizId).classList.contains('hidden');

    if (hidden){
      document.getElementById('quiz-' + quizId).classList.remove('hidden');

    } else {
      document.getElementById('quiz-' + quizId).classList.add('hidden');

    }
  }
  
  saveConfidence(){
    const data = {lessonId: this.lessonId, level: this.confidenceSlider}
    this.lessonService.saveConfidence(data);
  }

}
