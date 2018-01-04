import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

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
  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private lessonService: LessonService, ) {
    
    this.lessonId = this.route.snapshot.params['id']
    
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
    
  }
  
  getLesson(): void {
    this.lessonService.getLesson(this.lessonId).then(lesson => {
          this.lesson = lesson;
        });
  }

}
