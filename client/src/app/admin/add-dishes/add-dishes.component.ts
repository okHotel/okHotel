import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../service/menu/menu.service';


@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {

    menu: MenuService

  constructor(menu1: MenuService) {
        this.menu = menu1;
  }

  ngOnInit() {
  }



}
