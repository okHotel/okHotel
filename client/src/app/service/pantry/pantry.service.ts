import { Injectable } from '@angular/core';
import {Product} from "../../admin/pantry/product";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs";
import {AuthService} from '../auth/auth.service';

@Injectable()
export class PantryService {

    private baseUrl = 'http://localhost:3000';
    private pantryUrl = this.baseUrl + '/product';  // URL to web api
    private httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    // Temporarily stores product from dialogs
    dialogData: Product = new Product();

    constructor (private httpClient: HttpClient) {}

    get data(): Product[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getProducts(): void {
      let httpHeaders = AuthService.getHeaderWithAuthorization();


      this.httpClient.get<Product[]>(this.pantryUrl,  {headers: httpHeaders}).subscribe(data => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            });
    }

    getProduct(id: string): Observable<Product> {
      const url = this.pantryUrl + '/' + id;
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      return this.httpClient.get<Product>(url, {headers: httpHeaders});
    }

    addProduct(product: Product): Observable<any> {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      return this.httpClient.post(this.pantryUrl, product, {headers: httpHeaders});
     }

    updateProduct(product: Product) {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      this.httpClient.put(this.pantryUrl, product, {headers: httpHeaders}).subscribe();
    }

    deleteProduct(id: string): void {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      this.httpClient.delete(this.pantryUrl + '/' + id, {headers: httpHeaders}).subscribe();
    }

    updateQuantityTo(value: number, product: Product) {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      product.quantity = value;
      this.updateProduct(product);
    }
}
