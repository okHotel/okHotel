import { Injectable } from '@angular/core';
import {Customer} from "../../customer/customer";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private customersUrl = this.baseUrl + '/auth';  // URL to web api
  private token: string;

  constructor(
      private http: HttpClient, private router: Router
  ) {

      const currentUser = localStorage.getItem('token');
      this.token = currentUser;
      if (this.token) {
          httpOptions.headers.append('Authorization', 'Bearer ' + this.token)
      }

  }

  login(username: string, password: string) {
      return this.http.post(`${this.customersUrl}/login`, { username: username, password: password }, httpOptions);
  }

  addCustomer (customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.customersUrl, customer, httpOptions);
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

}
