import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { PollService } from '../poll.service';
import { Poll, UA } from '../modle';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-poll-editor',
  templateUrl: './poll-editor.component.html',
  styleUrls: ['./poll-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PollEditorComponent implements OnInit {

  model: Poll;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  lesson: Array<string>;
  assosiatLesson: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pollService: PollService,
    private loginService: LoginService,
              ) { }

  ngOnInit() {
    if (this.loginService.signedIn){
      this.getPoll();
    }

    this.loginService.login.subscribe((login) => {
      if (login){
         this.getPoll();
       }
    });
    this.loginService.checkSignIn();


    this.route.params.subscribe(params => {  this.assosiatLesson = params['lesson'];  });

  }

  getPoll() {
    this.route.params
        .switchMap((params: Params) => this.pollService.getPoll(params['id']))
        .subscribe(poll => {
          console.log(poll);
                      if (poll == null) {
                        this.model = new Poll(NaN, '', [], [], this.loginService.userName, [], true, [new UA('', '' )]);
                      } else {

                        this.model = poll;
                      }
                      if (this.assosiatLesson != undefined){
                        //If a lessonId has been pased in the url push it to the lesson array
                        this.model.lesson.push(this.assosiatLesson.toString());
                      }

                    },
                  error => console.log);

   }
  onSubmit() {
    this.pollService.updatePoll(this.model.pollId.toString(), this.model).then((res) => {
      if (res.toString() != 'ok'){
        this.router.navigateByUrl(`/poll-editor/${res}`);
      } else {
        console.log('ok');
      }

    });
  }


  addQuestion(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.model.questions.push( value.trim() );
    }

    if (input) {
      input.value = '';
    }
  }

  removeQuestion(question: any) {
    const index = this.model.questions.indexOf(question);

    if (index >= 0) {
      this.model.questions.splice(index, 1);
    }
  }
  addAccess(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.model.access.push( value.trim() );
    }

    if (input) {
      input.value = '';
          console.log(value);

    }
  }

  removeAccess(access: any) {
    const index = this.model.access.indexOf(access);

    if (index >= 0) {
      this.model.access.splice(index, 1);
    }
  }

  addLesson(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.model.lesson.push( value );
    }

    if (input) {
      input.value = '';
    console.log(value);
    }
  }

  removeLesson(lesson: any) {
    const index = this.lesson.indexOf(lesson);

    if (index >= 0) {
      this.model.lesson.splice(index, 1);
    }
  }

  deletePoll() {
    this.pollService.deletePoll(this.model.pollId).then(res => {
      console.log(res == 'Accepted');
      if (res != 'Accepted'){
          console.error('Error Unable to delete');
        } else {
          this.router.navigateByUrl(`/poll-editor/na`);
        }
    });
  }
  separatorKeysCodes = [ENTER, COMMA];

  get diagnostic() { return JSON.stringify(this.model); }
}
