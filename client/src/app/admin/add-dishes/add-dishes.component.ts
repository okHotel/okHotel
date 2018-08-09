import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MenuService} from '../../service/menu/menu.service';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';


@Component({
    selector: 'app-add-dishes',
    templateUrl: './add-dishes.component.html',
    styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {

    lunch: string;
    dinner: string;

    constructor(public menu: MenuService) {

    }

    ngOnInit() {
    }

    addLunchDish(){
        this.menu.addLunchDish(this.lunch);
    }

    addDinnerDish(){
        this.menu.addDinnerDish(this.dinner);
    }

    saveLunch(event: any){
        this.lunch = event.target.value;
    }

    saveDinner(event: any){
        this.dinner = event.target.value;
    }
}
