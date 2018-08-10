import { Component, OnInit } from '@angular/core';
import {Product} from "../product";

@Component({
  selector: 'app-add-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  error: string;
  product: Product;
  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  goBack() {

  }

}
