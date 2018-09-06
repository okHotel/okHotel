import { Component, OnInit } from '@angular/core';
import {Menu} from '../menu';
import {MenuService} from '../../service/menu/menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Meal} from '../reservation';

@Component({
  selector: 'app-menu-statistics',
  templateUrl: './menu-statistics.component.html',
  styleUrls: ['./menu-statistics.component.scss']
})
export class MenuStatisticsComponent implements OnInit {

  date: Date = new Date();
  isLoadedDate: boolean = false;

  constructor(private router: Router, public menu: MenuService) { }

  ngOnInit() {}

  getTotalQuantitiesFor(dish: string, type: Meal): number {
    let quantity: number = 0;
    this.menu.menu.reservations
        .filter(m => dish == m.dish)
        .filter(t => type == t.type)
        .forEach(m => quantity = quantity + m.quantity);

    return quantity;
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

}
