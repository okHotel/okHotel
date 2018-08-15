import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../customer/customer';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "../../../../node_modules/rxjs/BehaviorSubject";
import {Product} from "../../admin/pantry/product";
import {HttpErrorResponse} from "../../../../node_modules/@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private baseUrl = 'http://localhost:3000';

    private customersUrl = this.baseUrl + '/customers';  // URL to web api
    private httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

    constructor(private http: HttpClient) {
        let headers = AuthService.getHeaderWithAuthorization();
        this.httpOption = {headers}
    }

    get data(): Customer[] {
        return this.dataChange.value;
    }

    getCustomers(): void {
        let httpHeaders = AuthService.getHeaderWithAuthorization();

        this.http.get<Customer[]>(this.customersUrl, {headers: httpHeaders}).subscribe(data => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
            });
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