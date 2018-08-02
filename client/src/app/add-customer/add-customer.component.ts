import {Component, Input, OnInit} from '@angular/core';
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
    confirmPassword: string;
    customerNeeds: string[] = [];
    need: string;

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
/*
        if (this.checkInputIsValid()) {
        } else {
            console.log('The input is not valid')
            // code smell here!
            // print error
        }
*/
    }

    goBack(): void {
        this.location.back();
    }

    addNeed() {
        this.customerNeeds.push(this.need);
    }

    private save(): void {
        this.customer.otherNeeds = this.customerNeeds;
        console.log(this.customer);
        this.customerService.addCustomer(this.customer)
            .subscribe();
    }

    private getRoomsNumber() {
        this.bookingService.getRoomsNumber()
            .subscribe(roomsNumber =>
                roomsNumber.forEach(n => this.roomsNumber.push(n['roomNumber'])));
    }

    private checkInputIsValid() {
        let booking = new Booking();
        this.bookingService
            .getBooking(this.customer.bookingName, this.customer.bookingSurname)
            .subscribe(res => {
                console.log(res)
                booking = res
            });

        console.log(booking);

        console.log(this.checkPasswordSameAs(this.confirmPassword),
            this.checkNameSameAs(booking.bookingName),
            this.checkSurnameSameAs(booking.bookingSurname),
            this.checkRoomNumberSameAs(booking.roomNumber),
            this.checkNumberOfPeopleSameAs(booking.numberOfPeople))

        return this.checkPasswordSameAs(this.confirmPassword)
            && this.checkNameSameAs(booking.bookingName)
            && this.checkSurnameSameAs(booking.bookingSurname)
            && this.checkRoomNumberSameAs(booking.roomNumber)
            && this.checkNumberOfPeopleSameAs(booking.numberOfPeople)
    }

    private checkPasswordSameAs(password: string) {
        return this.customer.password == password
    }

    private checkNameSameAs(name: string) {
        return this.customer.bookingName == name
    }

    private checkSurnameSameAs(surname: string) {
        return this.customer.bookingSurname == surname
    }

    private checkRoomNumberSameAs(roomNumber: number) {
        return this.customer.roomNumber == roomNumber
    }

    private checkNumberOfPeopleSameAs(numberOfPeople: number) {
        return this.customer.numberOfPeople == numberOfPeople
    }
}