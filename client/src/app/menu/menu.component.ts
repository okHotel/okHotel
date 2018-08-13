import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import { DatePipe } from '@angular/common'


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    lunch_dishes: String[];
    dinner_dishes: String[];

    constructor(private router: Router, private menu: MenuService, private datepipe: DatePipe) { }

    ngOnInit() {

        let latest_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

        this.menu.setDate(new Date(latest_date));
        this.menu.getDateMenu().subscribe(
            data => {
                console.log("Menu loaded");
                this.lunch_dishes = data.lunch_dishes;
                this.dinner_dishes = data.dinner_dishes;
            },
            error => {console.log(error)}
        );
    }

    home() {
        this.router.navigateByUrl('' );
    }

    addVariations(){
        this.router.navigateByUrl('/menu-variations' );
    }

}
