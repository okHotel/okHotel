import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Meal} from '../../menu/reservation';
import {Location} from '@angular/common';
import {VariationService} from '../../service/variation/variation.service';
import {BookingService} from '../../service/booking/booking.service';
import {Note} from '../../menu/Note';

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
  displayedColumns = ['dish', 'wholePortion', 'halfPortion'];
  displayedVariationsColumns = ['dish', 'intollerance', 'allergy'];
  displayedNotesColumns = ['roomNumber', 'text'];
  otherNotesDataSource: Note[];
  lunchDataSource = [];
  dinnerDataSource = [];
  variationsDataSource = [];
  roomsNumber: number[] = [];
  roomNumber: number;

  constructor(private router: Router, public menu: MenuService,
              private variationService: VariationService,
              private location: Location,
              private bookingService: BookingService) { }

  ngOnInit() {
    this.variationService.getVariations().subscribe(v => this.variationsDataSource = v);
    this.bookingService.getRoomsNumber().subscribe(n => {
      this.roomsNumber = n;
      console.log(this.roomsNumber);
    });
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
          this.otherNotesDataSource = data.otherNotes;
          this.isLoadedDate = true;
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
    const reservations = this.menu.menu.reservations
      .filter(m => dish === m.dish)
      .filter(t => type === t.type)
      .filter( r => this.roomNumber === r.roomNumber)
      .forEach(m => quantity = quantity + m.quantity);

    return quantity;
  }

  onPrint() {
    window.print();
  }
}

