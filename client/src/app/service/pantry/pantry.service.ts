import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product, Unit} from "../../admin/pantry/product/product";
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

export const ELEMENT_DATA: Product[] = [
    {code: 1, name: 'Spaghetti', category: 'pasta', quantity: 1, unit: Unit.PACKAGES},
    {code: 2, name: 'Latte', category: 'colazioni', quantity: 10, unit: Unit.L},
    {code: 4, name: 'Passata di pomodoro', category: 'conserve', quantity: 6, unit: Unit.L},
    {code: 10, name: 'Olio', category: 'condimenti', quantity: 10, unit: Unit.L},
    {code: 3, name: 'Sale', category: 'condimenti', quantity: 100, unit: Unit.KG},
    {code: 5, name: 'Fagiolini', category: 'verdure', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Fusilli', category: 'pasta', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Carciofi', category: 'verdure', quantity: 20, unit: Unit.KG}

];

