import { Component, OnInit } from '@angular/core';
import {Menu} from './menu';
import {MenuService} from '../../service/menu/menu.service';
@Component({
  selector: 'app-make-menu-view',
  templateUrl: './make-menu-view.component.html',
  styleUrls: ['./make-menu-view.component.css']
})
export class MakeMenuViewComponent implements OnInit {

  date: Date;

  constructor(private menu: MenuService) { }

  ngOnInit() {
  }

  saveMenu(){}

  updateMenu(date: Date){
      console.log(date)

    this.menu.getDateMenu(date)
        .subscribe(
            data => {

            console.log("DB OK");
            console.log(data);

              this.menu.setLunchDishes(data.lunch_dishes);
              this.menu.setDinnerDishes(data.dinner_dishes);

            },

        error => {
            console.log("DB error");
        });


  }
}
