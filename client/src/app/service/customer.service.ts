import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CustomerService {

    constructor(private http: Http) { }

    private serverApi = 'http://localhost:3000';

    public addCustomer(customer: Customer) {
        console.log('into addCustomer');

        const URI = `${this.serverApi}/customer/`;
        const headers = new Headers;
        const body = JSON.stringify({bookingName: customer.bookingName, bookingSurname: customer.bookingSurname,
            roomNumber: customer.roomNumber, numberOfPeople: customer.numberOfPeople, username: customer.username,
            password: customer.password, otherNeeds: customer.otherNeeds});
        console.log(body);
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body , { headers: headers })
            .map(res => res.json());



    }

}
