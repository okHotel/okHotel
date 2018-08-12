import { Injectable } from '@angular/core';
import {Product, Unit} from "../../admin/pantry/product";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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

// REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
    // ADD, POST METHOD
    addProduct(product: Product): void {
    this.httpClient.post(this.pantryUrl, product).subscribe(data => {
      this.dialogData = product;
//      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
//      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateProduct(product: Product): void {
        console.log(product)
    this.httpClient.put(this.pantryUrl, product).subscribe(data => {
        this.dialogData = product;
//        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
//        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteProduct(code: number): void {
    this.httpClient.delete(this.pantryUrl + '/' + code).subscribe(data => {
      console.log(data['']);
//        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
//        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
}