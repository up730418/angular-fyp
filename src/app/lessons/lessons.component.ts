import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Lesson } from './../modle';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];
  
  constructor() { this.getLessons(); }

  ngOnInit() {
    
  }
  
  getLessons() : void {
    this.lessons = [new Lesson("1", 
                               "the first lesson", 
                               [{"id":"1", "title": "poll 1"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"}, {"id":"room2", "title": "chat 2" }], 
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }], 
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ),
                    new Lesson("1", 
                               "the SECOND lesson", 
                               [{"id":"1", "title": "poll 1"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"},{"id":"room2", "title": "chat 2" }],
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }],
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ),
                    new Lesson("1", 
                               "the SECOND lesson", 
                               [{"id":"1", "title": "poll 1"}, {"id":"2", "title": "poll 2" }],
                               [{"id":"room1", "title": "chat 1"},{"id":"room2", "title": "chat 2" }],
                               [{"id":"1", "title": "quiz 1"},{"id":"2", "title": "quiz 2" }],
                               ["up730418@myport.ac.uk"], 
                               "up730418@myport.ac.uk" ) ]; 
    console.log(this.lessons);
  }

}
