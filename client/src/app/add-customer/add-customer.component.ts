import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { Location } from '@angular/common';
import {Reservation} from "../reservation/reservation";
import {ReservationService} from "../service/reservation/reservation.service";

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.css']
})

export class AddCustomerComponent{

    customer = new Customer();
    submitted = false;
    allReservations: Reservation[] = [];
    private customerNeeds: string[] = [];
    private need: string;

    constructor(
        private customerService: CustomerService,
        private reservationService: ReservationService,
        private location: Location
    ) { }

    ngOnInit() {
        this.getReservations();
    }

    newCustomer(): void {
        this.submitted = false;
        this.customer = new Customer();
    }

    addCustomer() {
        this.submitted = true;
        this.save();
    }

    goBack(): void {
        this.location.back();
    }

    addNeed() {
        this.customerNeeds.push(this.need);
    }

    private save(): void {
        console.log(this.customer);
        this.customerService.addCustomer(this.customer)
            .subscribe();
    }

    private getReservations() {
        return this.reservationService.getReservations()
            .subscribe(
                reservations => {
                    console.log(reservations);
                    this.allReservations =
                        reservations.sort((a, b) => a.roomNumber - b.roomNumber)
                }
            );
    }
}