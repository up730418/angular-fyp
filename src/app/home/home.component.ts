import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  templateToLoad: String;
  
  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.templateToLoad = this.route.snapshot.params['id'];
    console.log(this.templateToLoad)
  }

}
