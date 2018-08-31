import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../../service/menu/menu.service';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';


@Component({
    selector: 'app-add-dishes',
    templateUrl: './add-dishes.component.html',
    styleUrls: ['./add-dishes.component.scss']
})
export class AddDishesComponent implements OnInit {

    dish = "";

    constructor(public menu: MenuService) {}

    ngOnInit() {}

    composeDish(event: any){this.dish = event.target.value;}

    addLunchDish(){this.menu.addLunchDish(this.dish);}

    deleteLunchDish(dish: string){this.menu.deleteLunchDish(dish);}

    addDinnerDish(){this.menu.addDinnerDish(this.dish);}

    deleteDinnerDish(dish: string){this.menu.deleteDinnerDish(dish);}

    keyDownFunction(event) {
      if (event.keyCode === 13) {
        console.log('ciaoooo');
        this.dish = event.target.value;
      }
    }

}
