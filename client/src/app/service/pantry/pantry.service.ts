import { Injectable } from '@angular/core';
import {Product} from "../../admin/pantry/product";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable, ObservableInput} from "rxjs";
import {Customer} from "../../customer/customer";

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
        this.httpClient.get<Product[]>(this.pantryUrl).subscribe(data => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
                console.log (error.name + ' ' + error.message);
            });
    }

    getProduct(id: string): Observable<Product> {
      const url = this.pantryUrl + '/' + id;
      return this.httpClient.get<Product>(url);
    }

    addProduct(product: Product): void {
       this.httpClient.post(this.pantryUrl, product).subscribe();
     }

    updateProduct(product: Product) {
      this.httpClient.put(this.pantryUrl, product, this.httpOption).subscribe();
    }

    deleteProduct(id: string): void {
      this.httpClient.delete(this.pantryUrl + '/' + id).subscribe();
    }

    updateQuantityTo(value: number, product: Product) {
      product.quantity = value;
      this.updateProduct(product);
    }
}
