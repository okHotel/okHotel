import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-variation',
  templateUrl: './add-variation.component.html',
  styleUrls: ['./add-variation.component.css']
})
export class AddVariationComponent implements OnInit {

  variations = ['Wheat', 'Milk', 'Egg'];
  constructor() { }

  ngOnInit() {
  }

}
