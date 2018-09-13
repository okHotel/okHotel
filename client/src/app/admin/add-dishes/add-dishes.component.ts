import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../../service/menu/menu.service';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {ThemingService} from '../../service/theming/theming.service';


@Component({
    selector: 'app-add-dishes',
    templateUrl: './add-dishes.component.html',
    styleUrls: ['./add-dishes.component.scss']
})


export class AddDishesComponent implements OnInit {
    @ViewChild('inputLunch') elLunch: ElementRef;
    @ViewChild('inputDinner') elDinner: ElementRef;

    dish = '';
    commonDishes: Array<string> = ['Pasta in bianco', 'Pasta al pomodoro', 'Affettati misti', 'Formaggi misti' ];

    constructor(public menu: MenuService, public themingService: ThemingService) {}

    ngOnInit() {

      this.themingService.checkAndChangeInputBorders();
    }

    composeDish(event: any) {
      this.dish = event.target.value;
    }

    addLunchDish() {
      console.log("a");
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
