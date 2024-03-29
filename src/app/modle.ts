export class Modle {

}

export class Poll {
  constructor(
    public pollId: number,
    public title: string,
    public questions: Array<string>,
    public access: Array<string>,
    public owner: string,
    public lesson: Array<string>,
    public hidden: boolean,
    public answers: [ UA ],
  ) { }
}

export class Chat {
  constructor(
    public chatId: number,
    public title: string,
    public access: Array<any>,
    public owner: string,
    public lesson: Array<string>,
    public message: [ UM ],
  ) { }
}

export class Lesson {
  constructor(
    public lessonId: number,
    public title: string,
    public polls: Array<any>,
    public chats: Array<any>,
    public questionairs: Array<any>,
    public slideURL: string,
    public access: Array<any>,
    public owner: string,
    public lessonObjectives: Array<LO>,
    public confidence: Array<UC>,
  ) { }
}

export class Questionnaire {
  constructor(
    public questionnaireId: number,
    public title: string,
    public access: Array<any>,
    public owner: string,
    public lesson: Array<string>,
    public hidden: boolean,
    public questions: [ QAC ],
    public answers: [ UAA ],
  ) { }
}

export class User {
  constructor(
    public username: string,
    public userType: string,
    // public chats: Array<any>,
    public firstName: string,
    public lastName: string,
  ) { }
}

export class QA {
  constructor(
    public question: string,
    public answer: string,
    ) { }
}

export class UA {
  constructor(
    public user: string,
    public answer: string,
    ) { }
}

export class UAA {
  constructor(
    public user: string,
    public answer: Array<any>,
    ) { }
}

export class UM {
  constructor(
    public user: string,
    public message: string,
    ) { }
}

export class QAC {
  constructor(
    public question: string,
    public correctAnswer: string,
    public otherAnswer: Array<any>,
    ) { }
}

export class LO {
  constructor(
//    public LOId: number,
    public title: string,
    public questionnaireId: Array<any>,
    ) { }
}

export class TeachingClass {
  constructor(
    public classId: number,
    public name: string,
    public students: Array<any>,
    ) { }
}
export class UC {
  constructor(
    public userName: string,
    public level: number,
    ) { }
}
