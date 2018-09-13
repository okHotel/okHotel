import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product, Unit} from "../product";
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {ErrorService} from '../../../service/error/error.service';
import {ThemingService} from '../../../service/theming/theming.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

    constructor(public pantryService: PantryService,
                private route: ActivatedRoute,
                private location: Location,
                public errorService: ErrorService,
                public themingService: ThemingService) {

      document.body.style.backgroundImage = "url('../../assets/images/pantry.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";

    }

    formControl = new FormControl('', [Validators.required]);
    product: Product = new Product();
    error: string;

    units = Object.values(Unit);

    ngOnInit() {

      const id = this.route.snapshot.paramMap.get('id');
      this.pantryService.getProduct(id)
        .subscribe(product => {
          this.product = product;
          console.log(this.product);
        }, err => {
          console.log(err);
          this.errorService.error = err.error.message;
        });

      this.themingService.checkAndChangeInputBorders();
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    submit() {

    }

    saveAndGoBack(): void {
        this.pantryService.updateProduct(this.product);
        this.goBack();
    }

    isCodeInvalid() {
        return this.product.code !== undefined && this.product.code.length !== 8 &&
          this.product.code.length !== 13 &&
          this.product.code.length !== 14 &&
          this.product.code.length !== 17;
    }

    goBack(): void {
      this.location.back();
    }

}
