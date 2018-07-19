import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Customer} from '../../customer';
import {CustomerService} from '../../service/customer.service';



@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: [ './customer-detail.component.css' ]
})
export class CustomerDetailComponent implements OnInit {
    @Input() customer = new Customer();
/*
    customer: Customer = {
        roomNumber: 1,
        bookingName: 'Santino',
        bookingSurname: 'Santini',
        username: 'santino',
        password: 's4nt1n0',
        numberOfPeople: 2,
        otherNeeds: 'svetlana'

*/
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

    goBack(): void {
        this.location.back();
    }

    home() {
        this.router.navigateByUrl('/home' );
    }

    logOut() {
        this.router.navigateByUrl('/');
    }

    getCustomer(bookingName: string, bookingSurname: string) {
        this.customerService.getCustomer(bookingName, bookingSurname)
            .subscribe((result: any) => {
                console.log(result);
                this.customer.bookingSurname = result.bookingSurname;
                this.customer.bookingName = result.bookingName;
                this.customer.roomNumber = result.roomNumber;
                this.customer.numberOfPeople = result.numberOfPeople;
                this.customer.username = result.username;
                this.customer.password = result.password;
                this.customer.otherNeeds = result.otherNeeds;
            });

        console.log('customer: ' + this.customer);
    }

    save() {
        this.customerService.updateCustomer(this.customer);
        this.router.navigateByUrl('/');
    }
}
