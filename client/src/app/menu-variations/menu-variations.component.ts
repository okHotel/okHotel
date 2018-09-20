import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import {VariationService} from '../service/variation/variation.service';
import {CustomerService} from '../service/customer/customer.service';
import {Meal, Reservation, VariationType} from '../menu/reservation';
import {ThemingService} from '../service/theming/theming.service';

@Component({
  selector: 'app-menu-variations',
  templateUrl: './menu-variations.component.html',
  styleUrls: ['./menu-variations.component.scss']
})


export class MenuVariationsComponent implements OnInit {

  public showSide = false;
  public variations = [];
  public people = [];
  public room;

  public intollerance = VariationType.INTOLLERANCE;
  public allergy = VariationType.ALLERGY;

  constructor(private router: Router, private customerService: CustomerService, private menu: MenuService,
              private variationService: VariationService,
              public themingService: ThemingService) {}

  ngOnInit() {
    this.variationService.getVariations()
      .subscribe(variations => {
        variations.forEach((obj) => {
          this.variations.push(obj.type);
        });
      });

    this.customerService.getLoggedCustomer().subscribe(data => {
      for (let i = 0; i <= data.numberOfPeople; i++) {
        this.people.push(i);
      }
      this.room = data.roomNumber;
    });

    this.themingService.checkAndChangeInputBorders();
    this.themingService.checkAndChangeTextContrast();
    this.themingService.setCurrentTheme();
  }

  goToMenu() {
    this.menu.showLunchVariations = false;
    this.menu.showDinnerVariations = false;
  }

  setVariation(variationName: string, variationType: VariationType, selectedQuantity: number) {
    this.menu.savedRes.variations.push({
      type: variationType,
      name: variationName,
      quantity: selectedQuantity
    });
  }

  getVariations(type: VariationType, dish: string) {
    let res = 0;
    this.menu.menu.reservations.filter(r => r.roomNumber === this.room)
      .forEach( r => r.variations.filter(v => v.type === type && v.name === dish).forEach(v => {
        res = v.quantity;
      }));
    return res;
  }

  openNav() {
    console.log('a');
    this.showSide = true;
  }

  closeNav() {
    console.log('b');
    this.showSide = false;
  }
}
