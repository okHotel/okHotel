import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Meal, Reservation, Variation, VariationType} from '../../menu/reservation';
import {Location} from '@angular/common';
import {VariationService} from '../../service/variation/variation.service';
import {BookingService} from '../../service/booking/booking.service';
import {Note} from '../../menu/Note';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {ThemingService} from '../../service/theming/theming.service';

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
  variation = VariationType;
  displayedColumns = ['dish', 'wholePortion', 'halfPortion'];
  displayedNotesColumns = ['roomNumber', 'text'];
  otherNotesDataSource: Note[];
  lunchDataSource = [];
  dinnerDataSource = [];
  roomsNumber: number[] = [];
  roomNumber: number;

  constructor(private router: Router, public menu: MenuService,
              private variationService: VariationService,
              private location: Location,
              private bookingService: BookingService,
              public themingService: ThemingService) {

    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('../../assets/images/restaurant.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }
  }

  ngOnInit() {
    this.bookingService.getRoomsNumber().subscribe(n => {
      this.roomsNumber = n;
    });

    this.themingService.checkAndChangeInputBorders();
    this.themingService.checkAndChangeTextContrast();
    this.themingService.setCurrentTheme();
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
          console.log('DB message');
          this.isLoadedDate = false;
          this.menu.setMenu(new Menu());
          this.menu.setDate(this.date);
        });
  }

  getTotalQuantitiesFor(dish: string, type: Meal): number {
    let quantity: number = 0;

    if (this.roomNumber == undefined) {
      const reservations = this.menu.menu.reservations
        .filter(m => dish === m.dish)
        .filter(t => type === t.type)
        /*.filter( r => (this.roomNumber === r.roomNumber))*/
        .forEach(m => quantity = quantity + m.quantity);
    } else {
      const reservations = this.menu.menu.reservations
        .filter(m => dish === m.dish)
        .filter(t => type === t.type)
        .filter( r => this.roomNumber === r.roomNumber)
        .forEach(m => quantity = quantity + m.quantity);
    }

    return quantity;
  }

  getVariations(dish: string, meal: Meal, type: VariationType): Variation[] {
    let reservations: Reservation[] = [];

    if (this.roomNumber == undefined) {
      reservations = this.menu.menu.reservations
        .filter(m => dish === m.dish)
        .filter(t => meal === t.type);
    } else {
      reservations = this.menu.menu.reservations
        .filter(m => dish === m.dish)
        .filter(t => meal === t.type)
        .filter(r => r.roomNumber == this.roomNumber);
    }

    let variations: Variation[] = [];

    reservations.forEach(r => variations = variations.concat(r.variations));

    return variations.filter(v => v.type == type);
  }

  onPrint() {
    window.print();
  }
}

