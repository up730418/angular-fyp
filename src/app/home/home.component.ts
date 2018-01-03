import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { LoginService } from '../login.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  templateToLoad: String;
  
  constructor(private route: ActivatedRoute,
              private loginService: LoginService, 
) { }

  ngOnInit() {
    this.loginService.login.subscribe((login) => {
      if(login){
//         this.getPollData(this.pollId);
//        this.userName = this.loginService.userName;
       }
    });
    this.loginService.checkSignIn()
    
    this.templateToLoad = this.route.snapshot.params['id'];
    console.log(this.templateToLoad)
  }
  

}
