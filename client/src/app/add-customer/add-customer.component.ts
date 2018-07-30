import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { Location } from '@angular/common';
import {Booking} from "../booking/booking";
import {BookingService} from "../service/booking/booking.service";

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.css']
})

export class AddCustomerComponent{

    customer = new Customer();
    submitted = false;
    roomsNumber: number[] = [];
    private customerNeeds: string[] = [];
    private need: string;

    constructor(
        private customerService: CustomerService,
        private bookingService: BookingService,
        private location: Location
    ) { }

    ngOnInit() {
        this.getRoomsNumber();
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

    private getRoomsNumber() {
        this.bookingService.getRoomsNumber()
            .subscribe(roomsNumber =>
                roomsNumber.forEach(n => this.roomsNumber.push(n['roomNumber'])));
    }
}