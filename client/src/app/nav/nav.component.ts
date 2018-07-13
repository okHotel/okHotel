import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  menu_dates = [new Date(2018,7,10), new Date(2018,7,9), new Date(2018, 7, 8) ];

  constructor() { }

  ngOnInit() {}

}
