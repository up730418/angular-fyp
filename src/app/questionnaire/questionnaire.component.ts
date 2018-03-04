import { Input, Component, OnInit, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Questionnaire, QAC } from './../modle';
import { DOCUMENT } from '@angular/common';

import { LoginService } from '../login.service';
import { QuestionnaireService } from '../questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements OnInit {

  questionnaire: Questionnaire;
  numberOfQuestion: number;
  correctAnswers: number;
  answerTracker: Array<any>;
  questionnaireId: string;
  @Input() questionnaireid; //Id pased in component def e.g. <app-uestionnaire uestionnaireid="15">

  constructor(@Inject(DOCUMENT) private document: Document,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private questionnaireService: QuestionnaireService, ) {

                this.answerTracker = [];
                this.correctAnswers = 0;
  }

  ngOnInit() {

    //Check if pollid is defined in comp def. If not use url params
    this.questionnaireId = this.questionnaireid ? this.questionnaireid : this.route.snapshot.params['id'];

    this.loginService.login.subscribe((login) => {
      if (login){
         this.getQuestionnaireData(this.questionnaireId);
       }
    });
    this.loginService.checkSignIn();
    this.getQuestionnaireData(this.questionnaireId);

  }

  ngAfterViewInit() {

  }

  getQuestionnaireData(id: string){

    this.questionnaireService.getQuestionaire(id).then( (res) => {
      res.questions.forEach((question) => {
        const rand = Math.floor(Math.random() * res.questions.length);
        question.otherAnswer.splice(rand, 0, question.correctAnswer);
      });
      this.questionnaire = res;
      this.numberOfQuestion = this.questionnaire.questions.length;

    });

  }

  nextQuestion(qNo, answerType) {
    const answerCorrect = answerType === this.questionnaire.questions[qNo].correctAnswer;
    if (answerCorrect) {
      this.correctAnswers += 1;
    }
    this.answerTracker[qNo] = answerCorrect ? 1 : 0;
    const nextQ = qNo + 1;

    if (nextQ < this.numberOfQuestion){
      document.getElementById('question-' + this.questionnaireId + '-' + nextQ).classList.remove('hidden');
      document.getElementById('question-' + this.questionnaireId + '-' + qNo).classList.add('hidden');
    } else {
      this.questionnaireService.addQuestionnaireResult(parseInt(this.questionnaireId), this.answerTracker);
      document.getElementById('question-' + this.questionnaireId + '-' + qNo).classList.add('hidden');
      document.getElementById(this.questionnaireId + '-finish').classList.remove('hidden');
      this.saveResults();

    }
  }

  saveResults() {
    this.questionnaireService.addQuestionnaireResult(parseInt(this.questionnaireId), this.answerTracker);
  }

  restart() {
      this.correctAnswers = 0;
      document.getElementById('question-' + this.questionnaireId + '-0').classList.remove('hidden');
      document.getElementById(this.questionnaireId + '-finish').classList.add('hidden');
  }

}
