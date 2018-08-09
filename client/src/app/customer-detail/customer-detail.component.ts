import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

    customer = new Customer() ;
    submitted = false;
    message: string;
    customerNeeds: string[] = [];
    need: string;
    error: string;

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
    }

    update(): void {
        this.submitted = true;
        this.customer.otherNeeds = this.customerNeeds;
        this.customerService.updateCustomer(this.customer)
            .subscribe(result => this.message = "Customer Updated Successfully!");
    }

    addNeed() {
        this.customerNeeds.push(this.need);
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