import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';

import { PollService } from '../poll.service';
import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson } from './../modle';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];
  lessonId: string;

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

  getLessons(): void {

    // If a single  lesson has been selected
    if (this.lessonId){
      // if the user wishes to create a new lesson
      if (this.lessonId === 'na'){
        this.lessonService.updateLesson('na', new Lesson(0, 'New Lesson', [], [], [], [], this.loginService.userName)).then(res => {
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
  deleteLesson(id: number): void{
    this.lessonService.deleteLesson(id).then(res => {
      if (res != 'Accepted'){
          console.error('Error Unable to delete');
        } else {
           document.getElementById('lesson-' + id).remove();
        }
    });
  }

  // Delete a poll permenintly and remove it from the lesson
  deletePoll(id: number): void{
    this.pollService.deletePoll(id).then(res => {
      if (res != 'Accepted'){
          console.error('Error Unable to delete');
        } else {
           document.getElementById('poll-' + id).remove();
        }
    });
  }

 //Update the lessons title
  updateTitle(id: number): void {
    let lessonToUpdate;
    this.lessons.forEach(lesson => { if (lesson.lessonId == id) lessonToUpdate = lesson; });
    this.lessonService.updateLesson(id.toString(), lessonToUpdate);

  }

}
