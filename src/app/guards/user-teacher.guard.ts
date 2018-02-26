import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';


@Injectable()
export class UserTeacherGuard implements CanActivate {

  constructor(private loginService: LoginService, ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('here is the guard');

      return this.checkTeacher();
    }

  checkTeacher(): Promise<boolean> {
    return this.loginService.checkUserType().then(userType => {
      console.log(userType);
      if (userType === 'Teacher' || userType === 'Admin') {
        return true;
      }
      return false;
    });
//      return false;
  }
}
