import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Meal} from '../../menu/reservation';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.scss']
})

export class AdminStatisticsComponent implements OnInit {

  date: Date = new Date();
  isLoadedDate: boolean = false;
  error: string;
  meal = Meal;

  constructor(private router: Router, public menu: MenuService) { }

  ngOnInit() {
  }

  goToHome(){
      this.router.navigateByUrl('/home');
  }

  goToMakeMenu() {
    this.router.navigateByUrl('/make-menu');
  }

  goToMakeVariation() {
    this.router.navigateByUrl('/make-variation');
  }

  setDateMenu(event: any){
    this.menu.setDate(this.date);
    this.serachDateMenu();
  }

  serachDateMenu() {
    return this.menu.getDateMenu()
      .subscribe(
        data => {
          this.menu.setMenu(data);
          this.isLoadedDate = true;
        },

        error => {
          console.log("DB error");
          this.isLoadedDate = false;
          this.menu.setMenu(new Menu());
          this.menu.setDate(this.date);
        });
  }

  getTotalQuantitiesFor(dish: string, type: Meal): number {
    let quantity: number = 0;
    this.menu.menu.reservations
      .filter(m => dish == m.dish)
      .filter(t => type == t.type)
      .forEach(m => quantity = quantity + m.quantity);

    return quantity;
  }

}

