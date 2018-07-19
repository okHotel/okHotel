import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()
export class CustomerService {
    private serverApi = 'http://localhost:3000';
    private headers = new Headers;
    private customer: any;

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    public addCustomer(customer: Customer) {
        console.log('into addCustomer');

        const URI = `${this.serverApi}/customer/`;
        const body = JSON.stringify({bookingName: customer.bookingName, bookingSurname: customer.bookingSurname,
            roomNumber: customer.roomNumber, numberOfPeople: customer.numberOfPeople, username: customer.username,
            password: customer.password, otherNeeds: customer.otherNeeds});
        console.log(body);
        this.headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body , { headers: this.headers })
            .map(res => res.json());
    }

    public updateCustomer(customer: Customer) {
        console.log('into updateCustomer');

        const URI = `${this.serverApi}/customer/${customer.bookingName}-${customer.bookingSurname}`;
        const body = JSON.stringify({bookingName: customer.bookingName, bookingSurname: customer.bookingSurname,
            roomNumber: customer.roomNumber, numberOfPeople: customer.numberOfPeople, username: customer.username,
            password: customer.password, otherNeeds: customer.otherNeeds});
            console.log(body);
        return this.http.put(URI, body , { headers: this.headers })
            .map(res => res.json());
    }

    public getCustomer(bookingName: string, bookingSurname: string) {
        console.log('into getCustomer');

        const URI = `${this.serverApi}/customer/${bookingSurname}`;
        console.log(URI);
        return this.http.get(URI, { headers: this.headers })
            .map(res => {
                console.log(res);
                return res.json();
            });
    }

}
