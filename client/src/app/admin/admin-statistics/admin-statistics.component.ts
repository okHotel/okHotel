import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Meal} from '../../menu/reservation';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})

export class AdminStatisticsComponent implements OnInit {

  date: Date = new Date();
  isLoadedDate = false;
  error: string;
  meal = Meal;
  displayedColumns = ['dish', 'wholePortion', 'halfPortion', 'intollerance', 'allergy'];
  lunchDataSource = [];
  dinnerDataSource = [];

  constructor(private router: Router, public menu: MenuService, private location: Location) { }

  ngOnInit() {

  }

  goBack(){
    this.location.back();
  }

  goToMakeMenu() {
    this.router.navigateByUrl('/make-menu');
  }

  goToMakeVariation() {
    this.router.navigateByUrl('/make-variation');
  }

  setDateMenu(event: any) {
    this.menu.setDate(this.date);
    this.serachDateMenu();
  }

  serachDateMenu() {
    return this.menu.getDateMenu()
      .subscribe(
        data => {
          this.menu.setMenu(data);
          this.lunchDataSource = data.lunch_dishes;
          this.dinnerDataSource = data.dinner_dishes;
          this.isLoadedDate = true;
          console.log(data)
        },

        error => {
          console.log('DB error');
          this.isLoadedDate = false;
          this.menu.setMenu(new Menu());
          this.menu.setDate(this.date);
        });
  }

  getTotalQuantitiesFor(dish: string, type: Meal): number {
    let quantity: number = 0;
    this.menu.menu.reservations
      .filter(m => dish === m.dish)
      .filter(t => type === t.type)
      .forEach(m => quantity = quantity + m.quantity);

    return quantity;
  }

  onPrint() {
    window.print();
  }
}

