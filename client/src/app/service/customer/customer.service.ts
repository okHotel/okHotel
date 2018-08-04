import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../customer/customer';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:3000';
    private customersUrl = this.baseUrl + '/customers';  // URL to web api
    private token;

    constructor(
        private http: HttpClient
    ) {

        this.token = localStorage.getItem('token');

        console.log(this.token)
    }

    getCustomers (): Observable<Customer[]> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token})
        };
        console.log(httpOptions)
        return this.http.get<Customer[]>(this.customersUrl, httpOptions)
    }

    getCustomer(id: string): Observable<Customer> {
        const url = `${this.customersUrl}/${id}`;
        return this.http.get<Customer>(url);
    }

    deleteCustomer (customer: Customer | string): Observable<Customer> {
        const id = typeof customer === 'string' ? customer : customer._id;
        const url = `${this.customersUrl}/${id}`;

        return this.http.delete<Customer>(url, httpOptions);
    }

    updateCustomer (customer: Customer): Observable<any> {
        return this.http.put(this.customersUrl, customer, httpOptions);
    }
}