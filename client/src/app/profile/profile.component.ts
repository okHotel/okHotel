import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {CustomerService} from "../service/customer/customer.service";
import {Customer} from "../customer/customer";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: Customer = new Customer();
  isCustomerLoggedIn: boolean;
  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
        this.customerService.getLoggedCustomer().subscribe(res => {
            this.customer = res;
            this.isCustomerLoggedIn = true;
        });
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/customers/' + this.customer._id );
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    AuthService.logout();
    this.isCustomerLoggedIn = false;
  }

  isLoggedIn() {
    this.isCustomerLoggedIn = AuthService.isLoggedIn();
    return this.isCustomerLoggedIn;
  }

}
