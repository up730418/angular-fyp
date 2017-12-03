import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { PollService } from '../poll.service';
import { Poll, UA } from '../modle';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PollEditorComponent implements OnInit {
  
  private model: Poll
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pollService: PollService,
              ) { }

  ngOnInit() {
    this.getPoll()
  }
 
  getPoll() {
    console.log("1")
   // let courseToReturn: Course;
    this.route.params
        .switchMap((params: Params) => this.pollService.getPoll(params['id']))
        .subscribe(poll =>{
          console.log(poll)
                      if (poll == null) {
                        this.model = new Poll(NaN, '', [], [], '', [new UA('', '' )]);
                      } else {

                        this.model = poll;
                      }

                    },
                  error => console.log);
    // return courseToReturn;
    
   }
  onSubmit() {
    console.log(this.model)
//    this.model.questions = this.model.questions.split(',');
    this.pollService.updatePoll(this.model.pollId.toString(), this.model).then((res) => {
      this.router.navigateByUrl(`/poll-editor/${res}`);
    });
//    console.log(x)
  }
  

  addQuestion(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.model.questions.push( value.trim() );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeQuestion(question: any): void {
    let index = this.model.questions.indexOf(question);

    if (index >= 0) {
      this.model.questions.splice(index, 1);
    }
  }
  addAccess(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.model.access.push( value.trim() );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAccess(access: any): void {
    let index = this.model.access.indexOf(access);

    if (index >= 0) {
      this.model.access.splice(index, 1);
    }
  }
  get diagnostic() { return JSON.stringify(this.model); }
  separatorKeysCodes = [ENTER, COMMA];
}
