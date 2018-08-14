import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';

@Component({
    selector: 'app-menu-variations',
    templateUrl: './menu-variations.component.html',
    styleUrls: ['./menu-variations.component.css']
})


export class MenuVariationsComponent implements OnInit {

  public variation = ['Wheat', 'Milk', 'Egg', 'Starwberry', 'Fish'];

  constructor(private router: Router, private menu: MenuService) { }

  ngOnInit() { }

  goToMenu(){
    this.menu.showVariations = false;
  }

}
