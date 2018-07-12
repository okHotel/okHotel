import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-variations',
    templateUrl: './menu-variations.component.html',
    styleUrls: ['./menu-variations.component.css']
})


export class MenuVariationsComponent implements OnInit {

  public title = 'aa';
  public variation = ['Wheat', 'Milk', 'Egg', 'Starwberry', 'Fish'];

  constructor() {}


  ngOnInit() { }



}
