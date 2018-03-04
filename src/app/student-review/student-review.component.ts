import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AppConstant } from '../../environments/environment';

import { LessonService } from '../lesson.service';
import { LoginService } from '../login.service';

import { Lesson,  Questionnaire } from './../modle';

@Component({
  selector: 'app-student-review',
  templateUrl: './student-review.component.html',
  styleUrls: ['./student-review.component.css']
})
export class StudentReviewComponent implements OnInit {
  lessons: any[]
  questionnairs: Questionnaire[]
  questionnaireModel;
  averageLessonScore: number;
  previouseLessonId: number;
  @Input() lessonId;
  @Input() userName;
  @Input() access;
  constructor(@Inject(DOCUMENT) private document: Document,
               private loginService: LoginService,
              private lessonService: LessonService,) { 
  }

  ngOnInit() {
    if (this.loginService.signedIn){
      this.getLessons();
    }
    //this.getRelatedQuizes()
  }
  
  ngOnChanges(changes) {
    console.log(changes);
    if(changes.lessonId.currentValue &&  
       changes.lessonId.currentValue !== changes.lessonId.previousValue){
      this.getLesson(this.lessonId)
    }
  }
  
  reviewLesson(lessonId: any){
    this.getRelatedQuizes(lessonId)
    //Get html Elements
    let currentLesson = document.getElementById('lessonData-' + lessonId)
    let previousLesson = document.getElementById('lessonData-' + this.previouseLessonId)
    //Hide old lesson and view the new one
    if(this.previouseLessonId == lessonId && !previousLesson.classList.contains('hidden')){
      //USed when user is toggling a single lesson
      previousLesson.classList.add('hidden');
    } else {
      //Show the new lesson
      currentLesson.classList.remove('hidden');
      //If the user isnt toggling a single lesson hide the old one
      if(this.previouseLessonId && this.previouseLessonId !== lessonId){
        previousLesson.classList.add('hidden');
      }
      
    }
    this.previouseLessonId = lessonId
  }
  
  getLessons() {
    console.log(this.lessonId, this.userName)
    if(this.lessonId || this.userName){
      console.log("tthisOne :()")
      this.getLesson(this.lessonId)
    } else {
      console.log("tthisOne")
      this.lessonService.getStudentLessons().then(lessons => {
        this.lessons = lessons;
       console.log(this.lessons)
      });
    }
  }
  
  getLesson(lessonId) {
     this.lessonService.getLesson(lessonId).then(lesson => {
       this.lessons = [lesson];
       this.lessons.push([this.access])
       console.log(this.lessons)
       
    });
  }
  
  getRelatedQuizes(lessonId: any) {
    this.lessonService.getQuestionnairs(lessonId).then(questionnairs => {
      this.questionnairs = questionnairs;
      this.createQuestionnaireModel(0, this.loginService.userName);
//      this.createAverageModel();
    });
  }
  updateQuestionaireModel(questionnaireIndex: number) {
    const userName = this.userName?  this.userName :  this.loginService.userName
    this.createQuestionnaireModel(questionnaireIndex, userName);
  }
  
  createQuestionnaireModel(questionnaireIndex: number, userName: String) {
    const answers = [];
    this.questionnaireModel = {}
    //Add no times a question was answered to an array
    let userAnswer = this.questionnairs[questionnaireIndex].answers.find((usersAnswer) => {
      return userName == usersAnswer.user;
    })
    if(!userAnswer || userAnswer == undefined){
      this.questionnaireModel = {title: this.questionnairs[questionnaireIndex].title, questions: [{question: "You have not yet completed this questionnaire", correct: ""}]};
    } else {
      //Create the model to be displayed in the HTML
      this.questionnaireModel = {title: this.questionnairs[questionnaireIndex].title, questions: []};

      const noAnswers = this.questionnairs[questionnaireIndex].answers.length;
      //Push the answer to each question to the display model
      this.questionnairs[questionnaireIndex].questions.forEach((quest, i) => {
        const correct = userAnswer.answer[i] == 1 ? "Correct" : "Incorrect" 
        const qa = {question: quest.question, correct: correct };
        this.questionnaireModel.questions.push(qa);
      });
    }
  }
}
