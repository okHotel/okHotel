import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../../service/menu/menu.service';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';


@Component({
    selector: 'app-add-dishes',
    templateUrl: './add-dishes.component.html',
    styleUrls: ['./add-dishes.component.scss']
})


export class AddDishesComponent implements OnInit {
    @ViewChild('inputLunch') elLunch: ElementRef;
    @ViewChild('inputDinner') elDinner: ElementRef;

    dish = '';
  commonLunchDishes: Array<string> = ['Tomato spaghetti', 'Pesto spaghetti', 'Carbonara spaghetti' ];
  commonDinnerDishes: Array<string> = ['Omelet', 'Meat', 'Ham' ];
    constructor(public menu: MenuService) {}

    ngOnInit() {
    }

    composeDish(event: any) {
      this.dish = event.target.value;
    }

    addLunchDish() {
      this.menu.addLunchDish(this.dish);
      this.elLunch.nativeElement.value = '';
    }

    deleteLunchDish(dish: string) {
      this.menu.deleteLunchDish(dish);
    }

    addDinnerDish() {
      this.menu.addDinnerDish(this.dish);
      this.elDinner.nativeElement.value = '';
    }

    deleteDinnerDish(dish: string) {
      this.menu.deleteDinnerDish(dish);
    }

}
