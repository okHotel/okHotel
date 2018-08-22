import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import {VariationService} from '../service/variation/variation.service';
import {CustomerService} from '../service/customer/customer.service';
import {Meal, Reservation} from '../menu/reservation';

@Component({
    selector: 'app-menu-variations',
    templateUrl: './menu-variations.component.html',
    styleUrls: ['./menu-variations.component.scss']
})


export class MenuVariationsComponent implements OnInit {

    public variations = [];
    public people = [];
    public room;

    public intollerance = Meal.INTOLLERANCE;
    public allergy = Meal.ALLERGY;

    constructor(private router: Router, private customerService: CustomerService, private menu: MenuService, private variationService: VariationService) {}

    ngOnInit() {
        this.variationService.getVariations()
            .subscribe(variations => {
                variations.forEach((obj) => {
                    this.variations.push(obj.type);
                });
            });

        this.customerService.getLoggedCustomer().subscribe(data => {
            for (let i = 0; i <= data.numberOfPeople; i++) {
                this.people.push(i);
            }
            this.room = data.roomNumber;
        });
    }

    goToMenu() {
        this.menu.showVariations = false;
    }

    setVariation(selectedDish: string, selectedType: Meal, selectedQuantity: number) {
        let newRes = true;
        this.menu.menu.reservations.forEach(r => {
            if (r.roomNumber === this.room && r.type === selectedType && r.dish === selectedDish) {
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
            this.menu.menu.reservations.push(reservation);
        }
    }

    getVariations(type: Meal, dish: string) {
        let res = 0;
        this.menu.menu.reservations.forEach(r => {
            if (r.roomNumber === this.room && r.type === type && r.dish === dish) {
                res = r.quantity;
            }
        });
        return res;
    }
}
