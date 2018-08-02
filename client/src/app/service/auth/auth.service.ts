import { Injectable } from '@angular/core';
import {Customer} from "../../customer/customer";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private customersUrl = this.baseUrl + '/auth';  // URL to web api
  constructor(
      private http: HttpClient
  ) { }

  login(username: string, password: string) {
      return this.http.post(`${this.customersUrl}/login`, { username: username, password: password });
  }

  addCustomer (customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
  }

}
