import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product, Unit} from "../../admin/pantry/product";
import {AuthService} from "../auth/auth.service";
import {Customer} from "../../customer/customer";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PantryService {

    private baseUrl = 'http://localhost:3000';
    private pantryUrl = this.baseUrl + '/customers';  // URL to web api
    private httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getPantry(): Observable<Product[]> {
        const url = `${this.pantryUrl}`;

        let httpHeaders = AuthService.getHeaderWithAuthorization();
        console.log({headers: httpHeaders});

        return this.http.get<Product[]>(url, {headers: httpHeaders});
    }

    getProduct(id: string): Observable<Product> {
        const url = `${this.pantryUrl}/${{id}}`;

        let httpHeaders = AuthService.getHeaderWithAuthorization();
        console.log({headers: httpHeaders});

        return this.http.get<Product>(url, {headers: httpHeaders});
    }

    updateProduct(product: Product): Observable<any> {
        return this.http.put(this.pantryUrl, product, this.httpOption);
    }
}
