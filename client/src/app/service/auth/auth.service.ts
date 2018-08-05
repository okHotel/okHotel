import { Injectable } from '@angular/core';
import {Customer} from "../../customer/customer";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private customersUrl = this.baseUrl + '/requireAuthBy';  // URL to web api
  private token: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };


    constructor(
      private http: HttpClient, private router: Router
  ) {
        let headers = AuthService.getHeaderWithAuthorization();
        this.httpOptions = {headers}
    }

  login(username: string, password: string) {
      return this.http.post(`${this.customersUrl}/login`, { username: username, password: password }, this.httpOptions);
  }

  addCustomer (customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions);
  }

  setToken(token){
      this.token = token;
  }

  canActivate() {
      if (localStorage.getItem('token')) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  static getHeaderWithAuthorization(): HttpHeaders {
      let token = localStorage.getItem('token');
      let headers: HttpHeaders;
      if (token) {
          headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
      }
      return headers;
  }

}
