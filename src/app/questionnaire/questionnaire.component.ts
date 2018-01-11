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
              private questionnaireService: QuestionnaireService,) { 
    this.answerTracker = [];
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
    document.getElementById("question-" + 0).classList.remove("hidden");
    
  }

  getQuestionnaireData(id:string){
    
    //Test stuff
    this.questionnaire = new Questionnaire(1, "Quest 1", [], "up730418@myport.ac.uk", [new QAC("What is the best app", "Defo not this one", ["This one", "Another One", "The Wrong Answer"]), new QAC("What is the best app 2", "Defo not this one", ["This one", "Another One", "The Wrong Answer"])])
    //this.questionnaireService.getQuestionaire(this.questionnaireId);
    this.questionnaireService.updateQuestionaire("1", this.questionnaire )
    //End test
    this.numberOfQuestion = this.questionnaire.questions.length;
  }
  
  nextQuestion(qNo, answerType): void {
    if(answerType == 0) {
      this.correctAnswers += 1
    }
    this.answerTracker[qNo] = answerType;
    let nextQ = qNo + 1;

    if(nextQ < this.numberOfQuestion){
      document.getElementById("question-" + nextQ).classList.remove("hidden");
      document.getElementById("question-" + qNo).classList.add("hidden");
    } else {
      console.log(this.questionnaireId, this.answerTracker)
      this.questionnaireService.addQuestionnaireResult(parseInt(this.questionnaireId),this.answerTracker);
    }
  }

}
