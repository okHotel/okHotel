import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {


  products = [new FoodCategory('Pasta', [new Food('Fusilli', 34), new Food('Penne',5)]),
              new FoodCategory('Verdure', [new Food('Fagiolini', 23), new Food('Carciofi', 6), new Food('Mais',6)]),
              new FoodCategory('Dolce', [new Food('Cacao',44), new Food('Vanillina', 33), new Food('Cioccolato Fondente',6)])
  ]
  constructor() { }

  ngOnInit() {
  }

}

export class FoodCategory{

    constructor(name: String, food: Food[]){}

    addFood(){}
}

export class Food{
  constructor(name: String, quantity: number){}
}
