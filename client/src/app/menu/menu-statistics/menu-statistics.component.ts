import { Component, OnInit } from '@angular/core';
import {Menu} from '../menu';
import {MenuService} from '../../service/menu/menu.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu-statistics',
  templateUrl: './menu-statistics.component.html',
  styleUrls: ['./menu-statistics.component.css']
})
export class MenuStatisticsComponent implements OnInit {

  menu: Menu = new Menu();

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.setDate(new Date(this.route.snapshot.paramMap.get('date')));
    this.menuService.getDateMenu().subscribe(menu => this.menu = menu);
  }

  getTotalQuantitiesFor(dish: string): number {
    let quantity: number = 0;
    this.menu.reservations
        .filter(m => dish == m.dish)
        .forEach(m => quantity = quantity + m.quantity);

    return quantity;
  }

}
