import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Customer} from '../../customer';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: [ './customer-detail.component.css' ]
})
export class CustomerDetailComponent implements OnInit {
//    @Input() customer: Customer;
    customer: Customer = {
        roomNumber: 1,
        bookingName: 'Santino',
        bookingSurname: 'Santini',
        username: 'santino',
        password: 's4nt1n0',
        numberOfPeople: 2,
        otherNeeds: 'svetlana'

    };

    constructor(
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {

    }

    goBack(): void {
        this.location.back();
    }

    home() {
        this.router.navigateByUrl('/home' );
    }

    logOut(){
        this.router.navigateByUrl('/');
    }
}
