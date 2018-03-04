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

    //Test stuff
    //this.questionnaire = new Questionnaire(1, "Quest 1", [], "up730418@myport.ac.uk", [new QAC("What is the best app", "Defo not this one", ["This one", "Another One", "The Wrong Answer"]), new QAC("What is the best app 2", "Defo not this one", ["This one", "Another One", "The Wrong Answer"])])
    this.questionnaireService.getQuestionaire(id).then( (res) => {
      console.log(res.questions)
      res.questions.forEach((question) =>{
        let rand = Math.floor(Math.random() * res.questions.length);
        question.otherAnswer.splice(rand,0,question.correctAnswer)
      })
      this.questionnaire = res;
      this.numberOfQuestion = this.questionnaire.questions.length;
//      document.getElementById("question-" + 0).classList.remove("hidden");

    });
    //this.questionnaireService.updateQuestionaire("1", this.questionnaire )
    //End test
//    this.questionnaireService.getQuestionaire(id))
//        .subscribe(poll => {
//          console.log(poll);
//                      if (poll == null) {
//                        this.model = new Poll(NaN, '', [], [], this.loginService.userName, [], [new UA('', '' )]);
//                      } else {
//
//                        this.model = poll;
//                      }
//                      if (this.assosiatLesson != undefined){
//                        //If a lessonId has been pased in the url push it to the lesson array
//                        this.model.lesson.push(this.assosiatLesson.toString());
//                      }
//
//                    }
  }

  nextQuestion(qNo, answerType) {
    console.log(answerType);
    const answerCorrect = answerType === this.questionnaire.questions[qNo].correctAnswer
    if (answerCorrect) {
      this.correctAnswers += 1;
    }
    this.answerTracker[qNo] = answerCorrect? 1 : 0;
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
