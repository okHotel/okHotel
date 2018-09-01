import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../customer/customer';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpErrorResponse} from "@angular/common/http";

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
    const headers = AuthService.getHeaderWithAuthorization();
    this.httpOption = {headers};
  }

  get data(): Customer[] {
    return this.dataChange.value;
  }

  getCustomers(): Observable<Customer[]> {
    const httpHeaders = AuthService.getHeaderWithAuthorization();

    this.http.get<Customer[]>(this.customersUrl, {headers: httpHeaders}).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.dataChange.error(error);
      });

    return this.http.get<Customer[]>(this.customersUrl, {headers: httpHeaders});
  }

  getCustomer(id: string): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;

    const httpHeaders = AuthService.getHeaderWithAuthorization();
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

  deleteCustomer(id: string): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    let httpHeaders = AuthService.getHeaderWithAuthorization();

    return this.http.delete<Customer>(url, {headers: httpHeaders});
  }

  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, this.httpOption);
  }

}
