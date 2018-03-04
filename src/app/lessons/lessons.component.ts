import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { PollService } from '../poll.service';
import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson, UC, LO } from './../modle';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];
  lessonId: string;
  separatorKeysCodes = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pollService: PollService,
              private lessonService: LessonService,
              private loginService: LoginService,
              @Inject(DOCUMENT) private document: Document, ) {
    this.lessons = [];
    this.lessonId = this.route.snapshot.params['id'];
    //If user is signed in get lesson data
    if (this.loginService.signedIn){
      this.getLessons();
    }

    this.router.events.subscribe(event => {
     // when the lesson id changes, refresh model
     if (this.lessonId !== this.route.snapshot.params['id']){
       this.lessonId = this.route.snapshot.params['id'];
       this.getLessons();
     }
    });

  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login){
         this.getLessons();
       }
    });
    //Check if user is already signed in or not
    this.loginService.checkSignIn();
  }

  getLessons() {

    // If a single  lesson has been selected
    if (this.lessonId){
      // if the user wishes to create a new lesson
      if (this.lessonId === 'na'){
        this.lessonService.updateLesson('na', new Lesson(0, 'New Lesson', [], [], [], [], this.loginService.userName,  [new LO('', [])], [new  UC('', 0)])).then(res => {
          this.router.navigateByUrl(`/lessons/${res}`);
        });
      } else {
        //Get a specific lessons data
        this.lessonService.getLesson(this.lessonId).then(lesson => {
          this.lessons = [];
          this.lessons.push(lesson);
        });
      }
    } else {
      // Get all users Lessons
      this.lessonService.getLessons().then(lessons => {
        this.lessons = lessons;
      });

    }
  }

  // Delete a lesson perminently
  deleteLesson(id: number) {
    this.lessonService.deleteLesson(id).then(res => {
      if (res != 'Accepted'){
          console.error('Error Unable to delete');
        } else {
           document.getElementById('lesson-' + id).remove();
        }
    });
  }

  // Delete a poll permenintly and remove it from the lesson
  deletePoll(id: number) {
    this.pollService.deletePoll(id).then(res => {
      if (res != 'Accepted'){
          console.error('Error Unable to delete');
        } else {
           document.getElementById('poll-' + id).remove();
        }
    });
  }

 //Update the lessons title
  updateTitle(id: number) {
    let lessonToUpdate;
    this.lessons.forEach(lesson => { if (lesson.lessonId == id) lessonToUpdate = lesson; });
    this.lessonService.updateLesson(id.toString(), lessonToUpdate);

  }

  addAccess(event: MatChipInputEvent, index: any) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.lessons[index].access.push( value.trim() );
    }

    if (input) {
      input.value = '';

    }
  }

  removeAccess(access: any, i: any) {
    const index = this.lessons[i].access.indexOf(access);

    if (index >= 0) {
      this.lessons[i].access.splice(index, 1);
    }
  }
  addObjective(lesson: Lesson) {
    lesson.lessonObjectives.push(new LO('', []));
  }

}
