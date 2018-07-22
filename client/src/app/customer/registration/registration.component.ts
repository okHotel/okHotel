import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    @Input() customer: Customer;
    roomsNumber = [102, 103, 201, 204];
    @Input() peopleNumber = 4;
    @Input() confirmPassword: string;

    private reservation = {
        'start': '10/06/2018',
        'end': '20/06/2018',
        'roomNumber': 102,
        'numberOfPeople': 4,
        'bookingName': 'Alessandro',
        'bookingSurname': 'Ricci'
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

       if (this.isInputValid()) {
           this.customer.numberOfPeople = this.reservation.numberOfPeople;
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
       return this.isPasswordValid() &&
              this.isBookingNameValid() &&
              this.isBookingSurnameValid() &&
              this.isRoomNumberValid();
   }

   private isPasswordValid() {
       return this.confirmPassword === this.customer.password;
   }

   private isBookingNameValid() {
       return this.customer.bookingName === this.reservation.bookingName;
   }

   private isBookingSurnameValid() {
       return this.customer.bookingName === this.reservation.bookingName;
   }

   private isRoomNumberValid() {
        return this.customer.roomNumber === this.reservation.roomNumber;
   }
}