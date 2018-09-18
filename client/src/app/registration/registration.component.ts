import {Component, Input, OnInit} from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { Location } from '@angular/common';
import {Booking} from "../booking/booking";
import {BookingService} from "../service/booking/booking.service";
import {AuthService} from "../service/auth/auth.service";
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../service/message/message.service';
import {ThemingService} from '../service/theming/theming.service';

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

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private bookingService: BookingService,
    private location: Location,
    private router: Router,
    public messageService: MessageService,
    public themingService: ThemingService
  ) {

    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('../../assets/images/casa-per-ferie-san-bassiano.jpg')";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }
  }

  ngOnInit() {
    this.getRoomsNumber();
    this.customerService.getCustomers();

    this.themingService.checkAndChangeInputBorders();
    this.themingService.checkAndChangeTextContrast();
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
            this.messageService.success = "Customer successfully added";
            this.messageService.error = '';
            this.router.navigateByUrl('');

          } else {
            this.registrationSuccessed = false;
            this.submitted = false;
            this.messageService.error = 'Input not valid';
          }
        }, error => {
          console.log(error.error.msg);
          this.registrationSuccessed = false;
          this.submitted = false;
          this.messageService.error  = error.error.msg;
        });

  }

  goBack(): void {
    this.location.back();
  }

  addNeed() {
    if (this.need.length > 0) {
      this.customerNeeds.push(this.need);
      this.need = '';
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
      && this.checkNumberOfPeopleSameAs(booking.numberOfPeople)
      && this.checkUsername();
  }

  private checkPasswordSameAs(password: string) {
    console.log('b1');
    return this.customer.password === password;
  }

  private checkNameSameAs(name: string) {
    console.log('b2');
    return this.customer.bookingName === name;
  }

  private checkSurnameSameAs(surname: string) {
    console.log('b3');
    return this.customer.bookingSurname === surname;
  }

  private checkRoomNumberSameAs(roomNumber: number) {
    console.log('b4');
    return this.customer.roomNumber === roomNumber;
  }

  private checkNumberOfPeopleSameAs(numberOfPeople: number) {
    console.log('b5');
    return this.customer.numberOfPeople === numberOfPeople;
  }

  private checkUsername() {
    this.customerService.dataChange.forEach( d => d.forEach( c => {
      if (c.username === this.customer.username) {
        return false;
      }
    }));

    return true;
  }
}
