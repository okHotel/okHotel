import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../customer/customer';
import {AuthService} from "../auth/auth.service";


@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:3000';
    private customersUrl = this.baseUrl + '/customers';  // URL to web api
    private httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        let headers = AuthService.getHeaderWithAuthorization();
        this.httpOption = {headers}
    }

    getCustomers (): Observable<Customer[]> {
        console.log(this.httpOption);
        let httpHeaders = AuthService.getHeaderWithAuthorization();
        console.log({headers: httpHeaders});

        return this.http.get<Customer[]>(this.customersUrl, {headers: httpHeaders});
    }

    getCustomer(id: string): Observable<Customer> {
        const url = `${this.customersUrl}/${id}`;

        let httpHeaders = AuthService.getHeaderWithAuthorization();
        console.log({headers: httpHeaders});

        return this.http.get<Customer>(url, {headers: httpHeaders});
    }

    getLoggedCustomer(): Observable<Customer> {
        const id = AuthService.getPayload()._id;
        const url = `${this.customersUrl}/${id}`;

        let httpHeaders = AuthService.getHeaderWithAuthorization();
        console.log({headers: httpHeaders});

        return this.http.get<Customer>(url, {headers: httpHeaders});
    }

    deleteCustomer (customer: Customer | string): Observable<Customer> {
        const id = typeof customer === 'string' ? customer : customer._id;
        const url = `${this.customersUrl}/${id}`;

        return this.http.delete<Customer>(url, this.httpOption);
    }

    updateCustomer (customer: Customer): Observable<any> {
        return this.http.put(this.customersUrl, customer, this.httpOption);
    }

}