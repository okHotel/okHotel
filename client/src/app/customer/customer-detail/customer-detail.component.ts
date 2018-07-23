import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from '../customer';
import {CustomerService} from '../../service/customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: [ './customer-detail.component.css' ]
})
export class CustomerDetailComponent implements OnInit {
    @Input() customer: Customer;
    customerNeeds: string[] = [];
    need: string;

    constructor(
        private customerService: CustomerService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let bookingName: string;
        this.route.params.subscribe(params => bookingName = params.bookingName);

        let bookingSurname: string;
        this.route.params.subscribe(params => bookingSurname = params.bookingSurname);

        console.log('bookingName-> ' + bookingName);
        console.log('bookingSurname-> ' + bookingSurname);
        this.getCustomer(bookingName, bookingSurname);
    }

    public goBack(): void {
        this.location.back();
    }

    public home() {
        this.router.navigateByUrl('' );
    }

    public logOut() {
        //        this.router.navigateByUrl('/');
    }

    public getCustomer(bookingName: string, bookingSurname: string) {
        this.customerService.getCustomer(bookingName, bookingSurname)
            .subscribe((result: any) => {
                console.log(Customer.fromJSON(result));
                this.customer = Customer.fromJSON(result);
                this.customerNeeds = result.otherNeeds as string[];
            });

        console.log('customer: ' + this.customer);
    }

    public updateCustomer() {
        console.log('into updateCustomer customer-detail');
        this.customerService.updateCustomer(this.customer)
            .subscribe((result: any) => {
                console.log(result);
                this.customer = Customer.fromJSON(result);
                this.customerNeeds = result.otherNeeds as string[];
            });
    }

    public deleteCustomer() {
        this.customerService.deleteCustomer(this.customer.bookingSurname)
            .subscribe((result: any) => {
                console.log(result);
            });
    }

/*
    public deleteNeed(need: string) {

    }
*/

    public addNeed() {
        this.customerNeeds.push(this.need);
    }
}
