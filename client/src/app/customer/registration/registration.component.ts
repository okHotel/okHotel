import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private customer: Customer;
  rooms_number = [101,102,103,104,105,106,107,108,109,110,
                  201,202,203,204]

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
       this.router.navigateByUrl('/home' );
    }
}