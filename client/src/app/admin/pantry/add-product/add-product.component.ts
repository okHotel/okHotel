import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from '../../../service/pantry/pantry.service';
import {Product, Unit} from '../product';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {MessageService} from '../../../service/message/message.service';
import {ThemingService} from '../../../service/theming/theming.service';

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
                private location: Location,
                public errorService: MessageService,
                public themingService: ThemingService) {

      if (this.themingService.isUseBackgroundOn()) {
        document.body.style.backgroundImage = "url('../../assets/images/pantry.jpg')";
        document.body.style.backgroundRepeat = "repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
      }
    }

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

      this.themingService.checkAndChangeInputBorders();
      this.themingService.checkAndChangeTextContrast();
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    submit() {
        // emppty stuff
    }

    public onSave(): void {
        this.pantryService.addProduct(this.product)
          .subscribe(result => console.log(result), error => {
            this.errorService.error = error.error.message;
            console.log(error)
          });
        this.location.back();
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
