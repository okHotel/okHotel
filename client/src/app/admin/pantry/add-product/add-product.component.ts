import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from '../../../service/pantry/pantry.service';
import {Product, Unit} from '../product';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

    product: Product = new Product();
    isCodeReadOnly: Boolean = false;
    units = Object.values(Unit);

    constructor(public pantryService: PantryService,
                private route: ActivatedRoute,
                private location: Location) {}

    formControl = new FormControl('', [
        Validators.required
    ]);

    ngOnInit() {
      console.log(this.product.code);
      const code = this.route.snapshot.paramMap.get('code');

      if (code !== null) {
        this.product.code = code;
        this.isCodeReadOnly = true;
      } else {
          this.product.code = '';
      }
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    submit() {
        // emppty stuff
    }

    public onSave(): void {
        this.pantryService.addProduct(this.product);
    }

    isCodeInvalid(code) {
       return code.length !== 8 &&
           code.length !== 13 &&
           code.length !== 14 &&
           code.length !== 17;
    }

    goBack(): void {
      this.location.back();
    }

}
