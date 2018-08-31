import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../../service/customer/customer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {AuthService} from '../../service/auth/auth.service';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    customer = new Customer() ;
    submitted = false;
    message: string;
    customerNeeds: string[] = [];
    need: string = '';
    error: string;
    canUserEdit: boolean = false;

    constructor(
        private customerService: CustomerService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.customerService.getCustomer(id)
            .subscribe(customer => {
                    this.customer = customer;
                    this.customerNeeds = customer.otherNeeds;
                }, err => {
                    this.error = err.error.message;
                });
        this.canUserEdit = AuthService.isUserAdmin();
    }

    update(): void {
//        this.submitted = true;
        this.customer.otherNeeds = this.customerNeeds;
        this.customerService.updateCustomer(this.customer)
            .subscribe();
    }

    updateAndGoBack() {
      this.update();
      this.location.back();
    }

    addNeedAndUpdate() {
        if (this.need.length > 0) {
            this.customerNeeds.push(this.need);
            this.update();
        }
    }

    deleteNeedAndUpdate(need: string) {
      this.customerNeeds = this.customerNeeds.filter( x => x !== need);
      this.customer.otherNeeds = this.customer.otherNeeds.filter(x => x !== need);
      this.update();
    }

    delete(): void {
        this.submitted = true;
        this.customerService.deleteCustomer(this.customer._id)
            .subscribe(result => this.message = "Customer Deleted Successfully!");
    }

    goBack(): void {
        this.location.back();
    }

}
