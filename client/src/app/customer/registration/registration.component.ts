import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';
import {NgForm} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    @Input() customer: Customer;
    roomsNumber = [102,103,201,204];
    peopleNumber = 3;
    @Input() confirmPassword: string;

    private reservation = {
        "start": "10/06/2018",
        "end": "20/06/2018",
        "roomNumber": 102,
        "numberOfPeople": 2,
        "bookingName": "Raffaella",
        "bookingSurname": "Carrà"
    }

  constructor(
      private customerService: CustomerService,
      private router: Router
  ) { }

    ngOnInit() {
        this.customer = {
            roomNumber: 0,
            bookingName: '',
            bookingSurname: '',
            username: '',
            password: '',
            numberOfPeople: 0,
            otherNeeds: ''
        };
    }

   public onSubmit() {


        log(this.confirmPassword, this.customer.password,
            this.customer.bookingName, this.reservation.bookingName,
            this.customer.bookingSurname, this.reservation.bookingSurname,
            this.customer.roomNumber, this.reservation.roomNumber);

       if (this.isInputValid()) {

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

       }
   }

   private isInputValid() {
        console.log("isInputValid");
       return this.confirmPassword == this.customer.password &&
           this.customer.bookingName == this.reservation.bookingName &&
           this.customer.bookingSurname == this.reservation.bookingSurname &&
           this.customer.roomNumber == this.reservation.roomNumber;

   }
}