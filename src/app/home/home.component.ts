import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LoginService } from '../login.service';
import { LessonService } from '../lesson.service';

import { Lesson } from './../modle';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  templateToLoad: String;
  lessons: Lesson[];

  constructor(private route: ActivatedRoute,
               private router: Router,
              private loginService: LoginService,
              private lessonService: LessonService, ) {

    if (this.loginService.signedIn) {
      this.getLessons();
    }
   this.router.events.subscribe(event => {
     // when the templateToLoad changes, refresh model
     if (this.templateToLoad !== this.route.snapshot.params['id']) {
       this.templateToLoad = this.route.snapshot.params['id'];
     }
   });
  }

  ngOnInit() {
    this.loginService.login.subscribe((login) => {
      if (login) {
        this.getLessons();
       }
    });
    this.loginService.checkSignIn();

    this.templateToLoad = this.route.snapshot.params['id'];
  }

  getLessons() {
    this.lessonService.getLessons().then(lessons => {
        this.lessons = lessons;
      });
  }


}
