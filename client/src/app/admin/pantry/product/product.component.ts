import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {Product, Unit} from "./product";
import {ELEMENT_DATA, PantryService} from "../../../service/pantry/pantry.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

//    product = new Product() ;
    product: Product = new Product();
    submitted = false;
    message: string;
    error: string;
    units = Unit;

    constructor(
        private pantryService: PantryService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
      this.product = {code: 1, name: 'Spaghetti', category: 'pasta', quantity: 1, unit: Unit.PACKAGES};
      /*
        const id = this.route.snapshot.paramMap.get('id');
        this.pantryService.getProduct(id)
            .subscribe(product => {
                this.product = product;
            }, err => {
                this.error = err.error.message;
            });
*/
    }

    update(): void {
        this.submitted = true;
        this.pantryService.updateProduct(this.product)
            .subscribe(result => this.message = "Product Updated Successfully!");
    }

    goBack(): void {
        this.location.back();
    }
}