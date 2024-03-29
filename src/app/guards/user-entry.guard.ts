import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';


@Injectable()
export class UserEntryGuard implements CanActivate {
  constructor(private router: Router,
              private loginService: LoginService, ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkUser();
    }

  checkUser(): Promise<boolean> {
    return this.loginService.checkUserType().then(userType => {
      if (userType === 'Student') {
        this.router.navigate(['/student-home']);
      } else if (userType === 'Teacher' || userType === 'Admin') {
        return true;
      }
      return false;
    });
//      return false;
  }
}
