import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import { DatePipe } from '@angular/common'
import {CustomerService} from '../service/customer/customer.service';
import {Customer} from '../customer/customer';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    lunch_dishes: String[];
    dinner_dishes: String[];
    people: number[] = [];

    lunchReservations = "";//: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    dinnerReservations: number[] = [];

    constructor(private router: Router, public menu: MenuService, private datepipe: DatePipe, private customerService: CustomerService) { }

    ngOnInit() {

        let latest_date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.menu.setDate(new Date(latest_date));

        this.menu.getDateMenu().subscribe(
            data => {
                console.log("Menu loaded");
                this.lunch_dishes = data.lunch_dishes;
                this.dinner_dishes = data.dinner_dishes;
            },
            error => {console.log(error)}
        );

        this.customerService.getLoggedCustomer().subscribe( data => {
            for (let i = 0; i < data.numberOfPeople; i++){
                this.people.push(i);
            }
        })
    }

    home() {
        this.router.navigateByUrl('' );
    }

    addVariations(){
        this.menu.showVariations = true;
    }

}
