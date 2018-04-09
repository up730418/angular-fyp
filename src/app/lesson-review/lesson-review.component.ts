import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppConstant } from '../../environments/environment';

import { LessonService } from '../lesson.service';
import { PollService } from '../poll.service';
import { QuestionnaireService } from '../questionnaire.service';
import { LoginService } from '../login.service';

import { Lesson, Poll, Questionnaire, QA, UA, UAA, QAC, LO, TeachingClass } from './../modle';
@Component({
  selector: 'app-lesson-review',
  templateUrl: './lesson-review.component.html',
  styleUrls: ['./lesson-review.component.css']
})
export class LessonReviewComponent implements OnInit {
  polls: Poll[];
  questionnairs: Questionnaire[];
  pollModel;
  questionnaireModel;
  averageLessonScore: number;
  averageLessonColour: string;
  studentConfidenceScore: number;
  studentConfidenceColour: string;
  lesson: Lesson;
  lessonId: string;
  socket;
  teachingClasses: TeachingClass[];
  url = AppConstant.BASE_API_URL;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private lessonService: LessonService, ) {
    this.lessonId = this.route.snapshot.params['id'];
    this.teachingClasses = [];
    if (this.loginService.signedIn) {
      this.getLesson();
      this.getRelatedPolls();
      this.getRelatedQuizes();
    }
  }

  ngOnInit() {
    //Check when the login status of a user changes
    this.loginService.login.subscribe((login) => {
      if (login) {
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
        this.createStudentConfidenceModel();
        this.lesson.access.forEach((access) => {
          this.lessonService.getTeachingClassByName(access).then((tc) => {
            this.teachingClasses.push(tc);
          });
        });
      });


  }

  getRelatedPolls() {
    this.lessonService.getPolls(this.lessonId).then(polls => {
      this.polls = polls;
      this.createPollModel(0);
    });
  }

  getRelatedQuizes() {
    this.lessonService.getQuestionnairs(this.lessonId).then(questionnairs => {
      this.questionnairs = questionnairs;
      this.createQuestionnaireModel(0);
      this.createAverageModel();
    });
  }

  createPollModel(pollIndex: number) {
    const answers = [];
    //Get non blank answers
    const answersToCheck = this.polls[pollIndex].answers.filter(answer => answer.user !== '' );
    //Add no times a question was answered to an array
    answersToCheck.forEach((answer, i) => {

        const index = parseInt(answer.answer);
        answers[index] = answers[index] ? answers[index] + 1 : 1;
    });

    const noAnswers = answersToCheck.length;
    //Create the model to be displayed in the HTML
    this.pollModel = {title: this.polls[pollIndex].title, questions: []};
    //Push the answer to each question to the display model
    this.polls[pollIndex].questions.forEach((quest, i) => {
      const percentage = answers[i] ? (100 / noAnswers * answers[i]) : 0;
      const qa = {question: quest, percentage: percentage.toFixed(2) };
      this.pollModel.questions.push(qa);
    });
  }

  createQuestionnaireModel(questionnaireIndex: number) {
    const answers = [];
    //Add no times a question was answered to an array
    this.questionnairs[questionnaireIndex].answers.forEach((answer, i) => {
        answer.answer.forEach((ans, i) => {
          if (ans === 1) {
            answers[i] = answers[i] ? answers[i] + 1 : 1;
          }
        });
    });

    //Create the model to be displayed in the HTML
    this.questionnaireModel = {title: this.questionnairs[questionnaireIndex].title, questions: []};

    const noAnswers = this.questionnairs[questionnaireIndex].answers.length;
    //Push the answer to each question to the display model
    this.questionnairs[questionnaireIndex].questions.forEach((quest, i) => {
      const percentage = answers[i] ? 100 / noAnswers * answers[i] : 0;
      const qa = {question: quest.question, percentage: percentage.toFixed(2) };
      this.questionnaireModel.questions.push(qa);
    });

    let average = 0;
    this.questionnaireModel.questions.forEach(quest => average += parseFloat(quest.percentage));
    average = average / this.questionnairs[questionnaireIndex].questions.length;
    this.questionnaireModel.questions.push({question: 'Overal Averags', percentage: average.toFixed(2) });
  }

  //Work out the average amount of correct answers for
  //All  questionairs attached to this lesson
  createAverageModel() {
    this.averageLessonScore = 0;
    for (const qi in this.questionnairs) {
      const answers = [];
      this.questionnairs[qi].answers.forEach((answer, i) => {
        answer.answer.forEach((ans, i) => {
          if (ans === 1) {
            answers[i] = answers[i] ? answers[i] + 1 : 1;
          }
        });
      });
      let questionnaireModel;
      //Create the model to be displayed in the HTML
      questionnaireModel = {title: this.questionnairs[qi].title, questions: []};

      const noAnswers = this.questionnairs[qi].answers.length;
      //Push the answer to each question to the display model
      this.questionnairs[qi].questions.forEach((quest, i) => {
        const percentage = answers[i] ? (100 / noAnswers * answers[i]) : 0;
        const qa = {question: quest.question, percentage: percentage };
        questionnaireModel.questions.push(qa);
      });

      let average = 0;
      questionnaireModel.questions.forEach(quest => average += quest.percentage);
      average = average / this.questionnairs[qi].questions.length;
      this.averageLessonScore += average;
    }
    this.averageLessonScore = parseFloat((this.averageLessonScore / this.questionnairs.length).toFixed(2));
    //Set the background colour of the percent board
    if (this.averageLessonScore >= 70) {
      this.averageLessonColour = 'lightgreen';
    } else if (this.averageLessonScore >= 50) {
      this.averageLessonColour = 'blue';
    } else {
      this.averageLessonColour = 'red';

    }
  }

  createStudentConfidenceModel() {
    let confidence = 0;
    this.lesson.confidence.forEach((result) => {
      confidence += result.level;
    });
    this.studentConfidenceScore = (confidence / this.lesson.confidence.length) * 10;

    if (this.studentConfidenceScore >= 70) {
      this.studentConfidenceColour = 'lightgreen';
    } else if (this.studentConfidenceScore >= 50) {
      this.studentConfidenceColour = 'blue';
    } else {
      this.studentConfidenceColour = 'red';

    }
  }

}
