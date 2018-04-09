import { Component, OnInit } from '@angular/core';

import { AppConstant } from '../../environments/environment';

import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson } from './../modle';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  url = AppConstant.BASE_API_URL;
  lessons: Lesson[];
  constructor(private loginService: LoginService,
              private lessonService: LessonService, ) {
    if (this.loginService.signedIn) {
      this.getLessons();
    }
  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login) {
         this.getLessons();
       }
    });
    //Check if user is already signed in or not
    this.loginService.checkSignIn();
  }

  getLessons() {
    this.lessonService.getStudentLessons().then(lessons => {
      this.lessons = lessons;
    });
  }

}
