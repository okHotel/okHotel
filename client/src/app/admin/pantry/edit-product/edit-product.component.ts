import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product, Unit} from "../product";
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {MessageService} from '../../../service/message/message.service';
import {ThemingService} from '../../../service/theming/theming.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('true => false', animate('600ms')),
      transition('false => true', animate('300ms')),
    ])
  ]
})
export class EditProductComponent {

  @ViewChild('prova') prova: ElementRef;

  constructor(public pantryService: PantryService,
              private route: ActivatedRoute,
              private location: Location,
              public messageService: MessageService,
              public themingService: ThemingService) {

    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('../../assets/images/pantry.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }

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
        this.messageService.error = err.error.message;
        this.messageService.success = '';
      });

      this.themingService.checkAndChangeInputBorders();
      this.themingService.checkAndChangeTextContrast();
      this.themingService.setCurrentTheme();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  saveAndGoBack(): void {
    this.pantryService.updateProduct(this.product);
    this.messageService.success = this.product.name + ' successfully updated';
    this.messageService.error = '';
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
