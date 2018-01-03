import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';

import { PollService } from '../poll.service';
import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service'

import { Lesson } from './../modle';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private pollService: PollService,
              private lessonService: LessonService,
              private loginService: LoginService,
              @Inject(DOCUMENT) private document: Document, ) { 
    this.getLessons(); 
  
  }

  ngOnInit() {
    this.loginService.login.subscribe((login) => {
      if(login){
         console.log(this.loginService.authtoken)
         this.getLessons();
//         this.createLesson();
       }
    });
    this.loginService.checkSignIn();
  }
  
  getLessons(): void {
    this.lessonService.getLessons().then(lessons => {
      console.log(lessons);
      this.lessons = lessons;
    });
  }
  getLessons2(): void {
    this.lessons = [new Lesson(1, 
                               "the first lesson", 
                               [{"id":"14", "title": "poll 14"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"}, {"id":"room2", "title": "chat 2" }], 
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }], 
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ),
                    new Lesson(1, 
                               "the SECOND lesson", 
                               [{"id":"1", "title": "poll 1"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"},{"id":"room2", "title": "chat 2" }],
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }],
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ),
                    new Lesson(1, 
                               "the SECOND lesson", 
                               [{"id":"1", "title": "poll 1"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"},{"id":"room2", "title": "chat 2" }],
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }],
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ) ]; 
    console.log(this.lessons);
  }

  createLesson(): void {
    this.lessonService.updateLesson("3",{lessonId: 3, 
                               title: "the third lesson", 
                               polls: [{"id":"15", "title": "poll 15"}, {"id":"2", "title": "poll 2" }],
                               chats: [{"id":"room1", "title": "chat 1"}, {"id":"room2", "title": "chat 2" }], 
                               questionairs: [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }], 
                               access: ["up730418@myport.ac.uk"], 
                               owner: "up730418@myport.ac.uk"});
  }
  
  deleteLesson(id: number): void{
    this.lessonService.deleteLesson(id).then(res => {
      console.log(res == "Accepted")
      if(res != "Accepted"){
          console.error("Error Unable to delete");
        } else {
           document.getElementById("lesson-" + id).remove();
        }
    });
  }

  deletePoll(id: number): void{
    this.pollService.deletePoll(id).then(res => {
      console.log(res == "Accepted")
      if(res != "Accepted"){
          console.error("Error Unable to delete");
        } else {
           document.getElementById("poll-" + id).remove();
        }
    });
  }

}
