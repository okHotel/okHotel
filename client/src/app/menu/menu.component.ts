import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import { DatePipe } from '@angular/common';
import {CustomerService} from '../service/customer/customer.service';
import {Meal, Reservation} from './reservation';
import {Menu} from './menu';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    l = Meal.LUNCH;
    d = Meal.DINNER;
    myMenu: Menu;
    people: number[] = [];
    room: number;

    constructor(private router: Router, public menu: MenuService, private datepipe: DatePipe, private customerService: CustomerService) { }

    ngOnInit() {

        const latest_date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.menu.setDate(new Date(latest_date));

        this.menu.getDateMenu().subscribe(
            data => {
                console.log("Menu loaded");
                this.myMenu = data;
            },
            error => {console.log(error)}
        );

        this.customerService.getLoggedCustomer().subscribe( data => {
            for (let i = 0; i <= data.numberOfPeople; i++) {
                this.people.push(i);
            }
            this.room = data.roomNumber;
        });


    }

    saveReservations() {
        this.menu.setMenu(this.myMenu);
        this.menu.saveMenu().subscribe();
    }

    addVariations() {
        this.menu.showVariations = true;
    }


    setReservation(selectedType: Meal, selectedDish: string, selectedQuantity: number) {
        let newRes = true;

        this.myMenu.reservations.forEach( r => {
            if (r.type === selectedType && r.dish === selectedDish) {
                r.quantity = selectedQuantity;
                newRes = false;
            }
        });

        if (newRes) {
            const reservation: Reservation = {
                roomNumber: this.room,
                type: selectedType.toString(),
                quantity: selectedQuantity,
                dish: selectedDish
            };
            this.myMenu.reservations.push(reservation);
        }
    }

    checkReservation(type: Meal) {
        let total = 0;

        this.myMenu.reservations.forEach(e => {
            if (e.type === type) {
                total += e.quantity;
            }});

        const mul_factor = type === Meal.LUNCH ? 2 : 3;

        return total > (this.people.length-1) * mul_factor; 
    }

    checkSave() {
        return this.checkReservation(Meal.LUNCH) || this.checkReservation(Meal.DINNER);
    }

    getErrorMessage() {
        return "Number of dishes booked too high";
    }

    getRes(type: Meal, dish: string) {
        let res = 0;
        this.myMenu.reservations.forEach( r => {
            if (r.type === type && r.dish === dish) {
                res = r.quantity;
            }
        })
        return res;
    }
}
