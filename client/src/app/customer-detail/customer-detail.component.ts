import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: [ './customer-detail.component.css' ]
})
export class CustomerDetailComponent implements OnInit {
    @Input() customer: Customer;

    constructor(
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private location: Location
    ) {}

    ngOnInit(): void {
//        this.getCustomer();
    }

    getCustomer(): void {

/*
      const bookingName = +this.route.snapshot.paramMap.get('bookingName');
      const bookingSurame = +this.route.snapshot.paramMap.get('bookingSurname');
      this.customerService.getCustomer(bookingName, bookingSurame)
          .subscribe(customer => this.customer = customer);
*/

    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
//        this.customerService.updateCustomer(this.customer)
//            .subscribe(() => this.goBack());
    }
}
