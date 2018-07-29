import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import {Reservation} from "../reservation";
import {BookingService} from "../../service/booking/booking.service";
import {CustomerService} from "../../service/customer/customer.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    @Input() customer = new Customer();
//    roomsNumber = [102, 103, 201, 204, 132];
    roomsNumber: number[] = [];
    @Input() confirmPassword: string;
    customerNeeds: string[] = [];
    need: string;

    private reservation: Reservation = new Reservation();
    allReservations: Reservation[] = [];

  constructor(
      private customerService: CustomerService,
      private bookingService: BookingService,
      private router: Router
  ) { }

    ngOnInit() {
         this.bookingService.getAllReservations()
             .forEach(res => this.allReservations = res);
         console.log(this.allReservations)
    }

   public onSubmit() {

       this.bookingService.getBookedCustomer(this.customer.bookingName, this.customer.bookingSurname)
           .subscribe(res => {
               this.reservation.bookingName = res.bookingName;
               this.reservation.bookingSurname = res.bookingSurname;
               this.reservation.roomNumber = res.roomNumber;
               this.reservation.numberOfPeople = res.numberOfPeople;
           });


       if (this.isInputValid()) {
           this.customer.numberOfPeople = this.reservation.numberOfPeople;
           this.customer.otherNeeds = this.customerNeeds;
           this.customerService.addCustomer(this.customer).subscribe(
               response => {
                   if (response.success === true) {
                       // Code smell here!
                       console.log('Customer added!');
                   } else {
                       console.log(response);
                   }
               }
           );
           this.router.navigateByUrl('');
       } else {
           console.log('Check the input datas or their matching with booking datas')
       }
   }

   public addNeed() {
        this.customerNeeds.push(this.need);
   }


    private isInputValid() {

       return this.isPasswordValid() &&
              this.isBookingNameValid() &&
              this.isBookingSurnameValid() &&
              this.isRoomNumberValid();
   }

   private isPasswordValid() {
       return this.confirmPassword === this.customer.password;
   }

   private isBookingNameValid() {
       return this.customer.bookingName == this.reservation.bookingName;
   }

   private isBookingSurnameValid() {
       return this.customer.bookingSurname == this.reservation.bookingSurname;
   }

   private isRoomNumberValid() {
        return this.customer.roomNumber == this.reservation.roomNumber;
   }

  private isNumberOfPeopleValid() {
        return this.customer.numberOfPeople == this.reservation.numberOfPeople;
  }

}
