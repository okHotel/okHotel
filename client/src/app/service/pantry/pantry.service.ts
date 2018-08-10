import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../admin/pantry/product";

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  constructor() { }

    findCourseById(param: any) {
        return undefined;
    }

    findProducts(code: number, name: string, category: string, sortDirection: string,
                 pageIndex: number, pageSize: number): Observable<Product[]> {
        return null;
    }
}
