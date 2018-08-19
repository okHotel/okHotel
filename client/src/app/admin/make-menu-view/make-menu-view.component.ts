import {Component, OnChanges, OnInit} from '@angular/core';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
@Component({
    selector: 'app-make-menu-view',
    templateUrl: './make-menu-view.component.html',
    styleUrls: ['./make-menu-view.component.css']
})
export class MakeMenuViewComponent implements OnInit {

    date: Date = new Date();
    isDateWrong: boolean = false;
    isLoadedDate: boolean = false;

    constructor(public menu: MenuService) { }

    ngOnInit() {
    }

    setDateMenu(event: any){
        console.log(event.target.value);
        console.log(this.date);
       // this.date = new Date(event.target.value);

        this.menu.setDate(this.date);
      //  if(this.date <= new Date()){
        this.serachDateMenu();
        //}


    }

    serachDateMenu() {

        return this.menu.getDateMenu()
            .subscribe(
                data => {

                    console.log("DB OK");

                   this.menu.setMenu(data);
                    this.isLoadedDate = true;
                },

                error => {
                    console.log("DB error");
                    this.isLoadedDate = false;
                    this.menu.setMenu(new Menu());
                    this.menu.setDate(this.date);
                });


    }

    saveMenu(){
        if(this.checkDate()){
           this.menu.saveMenu().subscribe( data =>{ console.log("Saved menu "+ data)});
        }
    }

    deleteMenu(){
        if(this.checkDate()){
            this.menu.deleteMenu().subscribe( data => { console.log("Deleted menu "+ data)});
        }
        this.menu.setMenu(new Menu());
        this.menu.setDate(this.date);
    }

    checkDate(){
        return true;
        //TODO filter some date that you don't want to use i.e. past dates
        /*if( this.isLoadedDate || this.date >= new Date()){
            return true;
        }else {
            this.isDateWrong = true;
            return false;
        }*/
    }
}
