import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppConstant } from '../../environments/environment';

import { LessonService } from '../lesson.service';
import { PollService } from '../poll.service';
import { QuestionnaireService } from '../questionnaire.service';
import { LoginService } from '../login.service';

import { Lesson, Poll, Questionnaire, QA, UA, UAA, QAC, LO } from './../modle';
@Component({
  selector: 'app-lesson-review',
  templateUrl: './lesson-review.component.html',
  styleUrls: ['./lesson-review.component.css']
})
export class LessonReviewComponent implements OnInit {
  polls: Poll[];
  questionnairs: Questionnaire[];
  pollModel
  questionnaireModel
  lesson: Lesson;
  lessonId: string;
  socket
  url = AppConstant.BASE_API_URL;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private lessonService: LessonService, ) 
  { 
    this.lessonId = this.route.snapshot.params['id'];

    if (this.loginService.signedIn){
      this.getLesson();
      this.getRelatedPolls();
    }
  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login){
         this.getLesson();
         this.getRelatedPolls();
        this.getRelatedQuizes();
        
       }
    });
    //Check if user is already signed in or not
    this.loginService.checkSignIn();
  }

  getLesson() {
    this.lessonService.getLesson(this.lessonId).then(lesson => {
          this.lesson = lesson;
        });
  }

  getRelatedPolls() {
    this.lessonService.getPolls(this.lessonId).then(polls => {
      this.polls = polls;
      this.createPollModel(0)
    });
  }

  getRelatedQuizes() {
    this.lessonService.getQuestionnairs(this.lessonId).then(questionnairs => {
      this.questionnairs = questionnairs;
      this.createQuestionnaireModel(0)
      console.log(this.questionnaireModel)
    });
  }
  
  createPollModel(pollIndex: number) {
    let answers = []
    //Get non blank answers
    let answersToCheck = this.polls[pollIndex].answers.filter(answer => answer.user !== "" )
    //Add no times a question was answered to an array
    answersToCheck.forEach((answer, i) => {
        
        let index = parseInt(answer.answer)
        answers[index] = answers[index] ? answers[index] + 1 : 1
    })
    
    let noAnswers = answersToCheck.length
    //Create the model to be displayed in the HTML
    this.pollModel = {title: this.polls[pollIndex].title, questions: []}
    //Push the answer to each question to the display model
    this.polls[pollIndex].questions.forEach((quest, i) => {
      let percentage = answers[i] ? (100/ noAnswers * answers[i]) : 0
      let qa = {question: quest, percentage: percentage }
      this.pollModel.questions.push(qa)
    })
  }

  createQuestionnaireModel(questionnaireIndex: number) {
    let answers = []
    //Add no times a question was answered to an array
    this.questionnairs[questionnaireIndex].answers.forEach((answer, i) => {
        console.log(answer)
        answer.answer.forEach((ans, i) => {
          if(ans === 1){
            answers[i] = answers[i] ? answers[i] + 1 : 1
          }
        })
    })
    
    //Create the model to be displayed in the HTML
    this.questionnaireModel = {title: this.questionnairs[questionnaireIndex].title, questions: []}
    
    let noAnswers = this.questionnairs[questionnaireIndex].answers.length
    //Push the answer to each question to the display model
    this.questionnairs[questionnaireIndex].questions.forEach((quest, i) => {
      let percentage = answers[i] ? (100/ noAnswers * answers[i]) : 0
      let qa = {question: quest.question, percentage: percentage }
      this.questionnaireModel.questions.push(qa)
    })
    
    let average = 0
    this.questionnaireModel.questions.forEach(quest => average += quest.percentage)
    average = average / this.questionnairs[questionnaireIndex].questions.length
    this.questionnaireModel.questions.push({question: "Overal Averags", percentage: average })
  }
}
