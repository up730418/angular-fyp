export class Modle {

}

export class Poll {
  constructor(
    public pollId: number,
    public title: string,
    public questions: Array<string>,
    public access: Array<string>,
    public owner: string,
    public answers: [ UA ],
  ) { }
}

export class Chat {
  constructor(
    public chatId: string,
    public title: string,
    public access: Array<any>,
    public owner: string,
    public message: [ UM ],
  ) { }
}

export class Lesson {
  constructor(
    public lessonId: string,
    public title: string,
    public polls: Array<any>,
    public chats: Array<any>,
    public questionairs: Array<any>,
    public access: Array<any>,
    public owner: string,
  ) { }
}

export class Questionair {
  constructor(
    public questionairId: string,
    public title: string,
    public access: Array<any>,
    public owner: string,
    public questions: [ QAC ],
  ) { }
}

export class User {
  constructor(
    public username: string,
    public password: string,
    public userType: string,
    public chats: Array<any>,
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
