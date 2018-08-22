import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})

export class AdminStatisticsComponent implements OnInit {

  public lunchDishes = ['Main courses', 'Pesto', 'Tomato', 'Omelet',
      'Chicken', 'Fruit', 'Desserts', 'Ice cream', 'Sherbet'];

  public dinnerDishes = ['Main courses', 'Carbonara', 'Tomato', 'Omelet',
      'Chicken', 'Fruit', 'Desserts', 'Ice cream', 'Sherbet'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

    goToHome(){
        this.router.navigateByUrl('/home');
    }
}

