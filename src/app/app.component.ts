import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  menuItems: Array<any>;
  teacherItems = [{title: 'Home', link: '/home'},
                 {title: 'Design', link: '/home/design'},
                 {title: 'Present', link: '/home/present'},
                 {title: 'Review', link: '/home/review'}, ];

  studentItems = [{title: 'Home', link: '/student-home'},
                 {title: 'Review Progress', link: '/student-review'}, ];

  adminItems = [{title: 'Home', link: '/home'},
                {title: 'Design', link: '/home/design'},
                {title: 'Present', link: '/home/present'},
                {title: 'Review', link: '/home/review'},
                {title: 'User Management', link: '/user-management'}, ];

  constructor(private loginService: LoginService, ) {
    this.checkUserType();
    this.loginService.login.subscribe((login) => {
      if (login) {
         this.checkUserType();
       }
    });
  }

  checkUserType() {
    this.loginService.checkUserType().then(userType => {
      if (userType == 'Admin') {
        this.menuItems = (this.adminItems);
      } else if (userType == 'Teacher') {
        this.menuItems = (this.teacherItems);

      } else  if (userType == 'Student') {
        this.menuItems = (this.studentItems);

      }
    }).catch(e => {/*Hanndle 401 errors*/});
  }
}
