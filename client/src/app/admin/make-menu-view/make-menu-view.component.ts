import {Component, OnChanges, OnInit} from '@angular/core';
import {Menu} from './menu';
import {MenuService} from '../../service/menu/menu.service';
@Component({
    selector: 'app-make-menu-view',
    templateUrl: './make-menu-view.component.html',
    styleUrls: ['./make-menu-view.component.css']
})
export class MakeMenuViewComponent implements OnInit {

    date: Date;
    isDateWrong: boolean = false;
    isLoadedDate: boolean = false;


    constructor(public menu: MenuService) { }

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

                   this.menu.setMenu(data);
                    this.isLoadedDate = true;
                },

                error => {
                    console.log("DB error");
                    this.isLoadedDate = false;
                });


    }

    saveMenu(){
        if(this.checkDate()){
           this.menu.saveMenu().subscribe( data =>{ console.log("OK "+ data)})
        }
    }

    deleteMenu(){
        if(this.checkDate()){
            //TODO delete menu
        }


    }

    checkDate(){
        return true;
        /*if( this.isLoadedDate || this.date >= new Date()){
            return true;
        }else {
            this.isDateWrong = true;
        }*/
    }
}
