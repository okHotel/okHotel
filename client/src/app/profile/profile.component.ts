import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {CustomerService} from "../service/customer/customer.service";
import {Customer} from "../customer/customer";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  customer: Customer;
  isCustomerLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.checkLogin();
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
    this.isAdmin = AuthService.isUserAdmin();
    return this.isCustomerLoggedIn;
  }

  checkLogin() {
      if (this.isLoggedIn()) {
          this.customerService.getLoggedCustomer().subscribe(res => {
              this.customer = res;
              this.isCustomerLoggedIn = true;
          });
      } else {
          this.goToLogin();
      }
  }

  goToServices() {
    this.router.navigateByUrl('/admin-profile');
  }
}
