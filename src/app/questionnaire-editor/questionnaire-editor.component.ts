import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

import { QuestionnaireService } from '../questionnaire.service';
import { Questionnaire, QAC, UAA } from '../modle';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-questionnaire-editor',
  templateUrl: './questionnaire-editor.component.html',
  styleUrls: ['./questionnaire-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionnaireEditorComponent implements OnInit {
  model: Questionnaire;
  selectable = true;
  removable = true;
  addOnBlur = true;
  lesson: Array<string>;
  assosiatLesson: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private loginService: LoginService, ) { }

  ngOnInit() {
    if (this.loginService.signedIn) {
      this.getQuestionnaire();
    }
    this.loginService.login.subscribe((login) => {
      if (login) {
         this.getQuestionnaire();
       }
    });
    this.loginService.checkSignIn();


    this.route.params.subscribe(params => {  this.assosiatLesson = params['lesson'];  });

  }

  getQuestionnaire() {
    this.route.params
        .switchMap((params: Params) => this.questionnaireService.getQuestionaire(params['id']))
        .subscribe(questionnaire => {
                      if (questionnaire == null) {
                        this.model = new Questionnaire(NaN, '', [], this.loginService.userName, [], true, [new QAC('', '', [])], [new UAA('', [])]);
                      } else {

                        this.model = questionnaire;
                      }
                      if (this.assosiatLesson != undefined) {
                        //If a lessonId has been pased in the url push it to the lesson array
                        this.model.lesson.push(this.assosiatLesson.toString());
                      }

                    },
                  error => console.error);
  }

  onSubmit() {
    this.questionnaireService.updateQuestionaire(this.model.questionnaireId.toString(), this.model).then((res) => {
      if (res.toString() != 'ok') {
        this.router.navigateByUrl(`/questionnaire-editor/${res}/${this.assosiatLesson}`);
      } else {
      }

    });
  }

  // Delete a Questionnaire permenintly and remove it from the assosciated lesson
  deleteQuestionnaire() {
    this.questionnaireService.deleteQuestionaire(this.model.questionnaireId).then(res => {
      if (res != 'Accepted') {
          console.error('Error Unable to delete');
        } else {
          this.router.navigateByUrl(`/questionnaire-editor/na/${this.assosiatLesson}`);

        }
    });
  }

  addQuestion(event: MatChipInputEvent, QACIndex: any) {
    const input = event.input;
    const value = event.value;
    const i = parseInt(QACIndex);

    if ((value || '').trim()) {
      this.model.questions[i].otherAnswer.push( value.trim() );

    }

    if (input) {
      input.value = '';
    }
  }

  removeQuestion(answer: any, QACIndex: any) {
    const index = this.model.questions[QACIndex].otherAnswer.indexOf(answer);

    if (index >= 0) {
      this.model.questions[QACIndex].otherAnswer.splice(index, 1);
    }
  }

  addQAC() {
    this.model.questions.push(new QAC('', '', []));
  }

  addAccess(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.model.access.push( value.trim() );
    }

    if (input) {
      input.value = '';

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
    }
  }

  removeLesson(lesson: any) {
    const index = this.lesson.indexOf(lesson);

    if (index >= 0) {
      this.model.lesson.splice(index, 1);
    }
  }


  separatorKeysCodes = [ENTER, COMMA];
}
