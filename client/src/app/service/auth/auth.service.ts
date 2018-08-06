import { Injectable } from '@angular/core';
import {Customer} from "../../customer/customer";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private baseUrl = 'http://localhost:3000';
  private customersUrl = this.baseUrl + '/auth';  // URL to web api
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (AuthService.isLoggedIn()) {
          return true;
      } else {
          this.router.navigate(['/login'], {
              queryParams: {
                  destinationUrl: state.url
              }
          });
          console.log(state.url)
          return false;
      }
    }

  static isLoggedIn() {
      if (localStorage.getItem('token')) {
          return true;
      } else {
          return false;
      }
  }

  static getHeaderWithAuthorization(): HttpHeaders {
      let token = localStorage.getItem('token');
      let headers: HttpHeaders;
      if (token) {
          headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
      }
      return headers;
  }

  static getPayload() {
    return this.isLoggedIn() ? jwt_decode(localStorage.getItem('token')) : null;
  }

  static logout() {
      localStorage.removeItem('token')
  }
}
