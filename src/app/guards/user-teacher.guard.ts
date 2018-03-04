import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';


@Injectable()
export class UserTeacherGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router, ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loginService.checkSignIn();
      return this.checkTeacher();
    }

  checkTeacher(): Promise<boolean> {
    return this.loginService.checkUserType().then(userType => {
      if (userType === 'Teacher' || userType === 'Admin') {
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    });
  }
}
