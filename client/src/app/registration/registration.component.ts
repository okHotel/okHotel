import {Component, Input, OnInit} from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { Location } from '@angular/common';
import {Booking} from "../booking/booking";
import {BookingService} from "../service/booking/booking.service";
import {AuthService} from "../service/auth/auth.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'registration-customer',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  customer = new Customer();
  submitted = false;
  roomsNumber: number[] = [];
  confirmPassword: string;
  customerNeeds: string[] = [];
  need: string;
  registrationSuccessed = true;
  message = 'Input not valid';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private bookingService: BookingService,
    private location: Location,
    private router: Router
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
            this.customer.role = 'customer';
            this.save();
            this.registrationSuccessed = true;

          } else {

            //TODO reindirizza bene
            console.log('Input error');
            this.registrationSuccessed = false;
            this.submitted = false;
          }

        }, error => {
          console.log(error.error.msg);
          this.registrationSuccessed = false;
          this.submitted = false;
          this.message = error.error.msg;
        });
  }

  goBack(): void {
    this.location.back();
  }

  addNeed() {
    if (this.need.length > 0) {
      this.customerNeeds.push(this.need);
    }
  }

  removeNeed(need) {
    this.customerNeeds = this.customerNeeds.filter( x => x !== need);
  }

  private save(): void {
    this.customer.otherNeeds = this.customerNeeds;
    this.authService.addCustomer(this.customer)
      .subscribe(() => this.router.navigateByUrl('/'));

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
      && this.checkNumberOfPeopleSameAs(booking.numberOfPeople);
  }

  private checkPasswordSameAs(password: string) {
    return this.customer.password === password;
  }

  private checkNameSameAs(name: string) {
    return this.customer.bookingName === name;
  }

  private checkSurnameSameAs(surname: string) {
    return this.customer.bookingSurname === surname;
  }

  private checkRoomNumberSameAs(roomNumber: number) {
    return this.customer.roomNumber === roomNumber;
  }

  private checkNumberOfPeopleSameAs(numberOfPeople: number) {
    return this.customer.numberOfPeople === numberOfPeople;
  }
}
