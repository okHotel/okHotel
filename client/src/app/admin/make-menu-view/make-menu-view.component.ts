import { Component, OnInit } from '@angular/core';
import {Menu} from './menu';
import {MenuService} from '../../service/menu/menu.service';
@Component({
    selector: 'app-make-menu-view',
    templateUrl: './make-menu-view.component.html',
    styleUrls: ['./make-menu-view.component.css']
})
export class MakeMenuViewComponent implements OnInit {

    dateMenu: Date;

    constructor(private menu: MenuService) { }

    ngOnInit() {
    }

    saveMenu(){}

    serachDateMenu(event: any){

        this.dateMenu = event.target.value;
        let stringDate = '' + event.target.value;

        this.menu.getDateMenu(stringDate)
            .subscribe(
                data => {

                    console.log("DB OK");

                    this.menu.setLunchDishes(data.lunch_dishes);
                    this.menu.setDinnerDishes(data.dinner_dishes);

                },

                error => {
                    console.log("DB error");
                });


    }

    deleteMenu(){}
}
