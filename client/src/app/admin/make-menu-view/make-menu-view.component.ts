import { Component, OnInit } from '@angular/core';
import {Menu} from './menu';
import {MenuService} from '../../service/menu/menu.service';
@Component({
    selector: 'app-make-menu-view',
    templateUrl: './make-menu-view.component.html',
    styleUrls: ['./make-menu-view.component.css']
})
export class MakeMenuViewComponent implements OnInit {

    menuLoaded: boolean = false;
    date: Date;

    constructor(private menu: MenuService) { }

    ngOnInit() {
    }

    setDateMenu(event: any){
        this.date = new Date(event.target.value);
        this.menu.setDate(this.date);

        if(this.date <= new Date()){
            this.serachDateMenu();
        }
    }

    serachDateMenu(){

        this.menu.getDateMenu()
            .subscribe(
                data => {

                    console.log("DB OK");

                    this.menu.setLunchDishes(data.lunch_dishes);
                    this.menu.setDinnerDishes(data.dinner_dishes);
                    this.menuLoaded = true;

                },

                error => {
                    console.log("DB error");
                    this.menuLoaded = false;
                });


    }

    saveMenu(){
      if(this.checkDate()){

      }
    }

    deleteMenu(){
        if(this.menuLoaded){

        }
    }

    checkDate(): boolean{
        if(this.menuLoaded || this.menu.date ){

        }
        return true;
    }
}
