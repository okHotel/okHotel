import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    lunch_dishes: String[];
    dinner_dishes: String[];

    constructor(private router: Router, private menu: MenuService) { }

    ngOnInit() {

        this.menu.setDate(new Date("2018-08-07T22:00:00.000Z"));
        this.menu.getDateMenu().subscribe(
            data => {
              console.log("ok");
                data.lunch_dishes.forEach(x => this.lunch_dishes.push(x));
                data.dinner_dishes.forEach(x => this.dinner_dishes.push(x));
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
