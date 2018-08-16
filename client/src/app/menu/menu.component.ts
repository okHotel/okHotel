import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import { DatePipe } from '@angular/common';
import {CustomerService} from '../service/customer/customer.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    lunch_dishes: String[];
    dinner_dishes: String[];
    people: number[] = [];

    lunchReservations: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    dinnerReservations: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    constructor(private router: Router, public menu: MenuService, private datepipe: DatePipe, private customerService: CustomerService) { }

    ngOnInit() {

        const latest_date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
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
            for (let i = 0; i <= data.numberOfPeople; i++){
                this.people.push(i);
            }
        });
    }

    home() {
        console.log(this.lunchReservations);
        console.log(this.dinnerReservations);
        //this.router.navigateByUrl('' );
    }

    addVariations() {
        this.menu.showVariations = true;
    }

    setLunch(index: number, value: number) {
        this.lunchReservations.splice(index, 1, value);
    }

    setDinner(index: number, value: number) {
        this.dinnerReservations.splice(index, 1, value);
    }

    checkLunchReservation() {
        let total = 0;
        this.lunchReservations.forEach(e => total += e);
        return total > this.people.length*2;
    }

    checkDinnerReservation() {
        let total = 0;
        this.dinnerReservations.forEach(e => total += e);
        return total > this.people.length*3;
    }

    checkSave(){
        return this.checkLunchReservation() && this.checkDinnerReservation();
    }

    getErrorMessage() {
        return "Number of dishes booked too high";
    }
}
