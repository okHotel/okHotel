import {Component, Input, OnInit} from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { Location } from '@angular/common';
import {Booking} from "../booking/booking";
import {BookingService} from "../service/booking/booking.service";
import {AuthService} from "../service/auth/auth.service";

@Component({
    selector: 'registration-customer',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

    customer = new Customer();
    submitted = false;
    roomsNumber: number[] = [];
    confirmPassword: string;
    customerNeeds: string[] = [];
    need: string;
    registrationSuccessed = true;

    constructor(
        private customerService: CustomerService,
        private authService: AuthService,
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

        this.bookingService
            .getBooking(this.customer.bookingName, this.customer.bookingSurname)
            .subscribe(

                data => {

                    if (this.checkInputIsValid(data)) {

                        console.log("new customer added");
                        this.save();
                        this.registrationSuccessed = true;

                    } else {

                        //TODO reindirizza bene
                        console.log("Input error");
                        this.registrationSuccessed = false;
                        this.submitted = false;
                    }

                },

                error => {
                    console.log("DB error");
                    this.registrationSuccessed = false;
                    this.submitted = false;
                });
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
        this.authService.addCustomer(this.customer)
            .subscribe();
    }

    private getRoomsNumber() {
        this.bookingService.getRoomsNumber()
            .subscribe(roomsNumber =>
                roomsNumber.forEach(n => this.roomsNumber.push(n['roomNumber'])));
    }

    private checkInputIsValid(booking: Booking) {

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