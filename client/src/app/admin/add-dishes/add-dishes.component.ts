import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {

    lunch_dishes = ['pomodoro', 'pesto', 'pollo'];
    dinner_dishes = ['zuppa', 'insalata di riso', 'pizza', 'caprese'];
  constructor() { }

  ngOnInit() {
  }



}
