import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../../admin/make-menu-view/menu';
import {DatePipe} from '@angular/common';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';
import {Customer} from '../../customer/customer';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    private baseUrl = 'http://localhost:3000';
    private menuUrl = this.baseUrl + '/menu';  // URL to web api

    public menu: Menu = new Menu();

    constructor(  private http: HttpClient) { }

    setDate(date: Date){
        this.menu.date = date;
    }

    getDateMenu(): Observable<Menu> {

        var datePipe = new DatePipe('en-US');
        let str = datePipe.transform(this.menu.date, 'yyyy-MM-dd'); //TODO use Date and not string

        console.log(str);

        const url = `${this.menuUrl}/${str}`;
        return this.http.get<Menu>(url);
    }

    setMenu(menu1: Menu){
        this.menu = menu1;
    }

    addLunchDish(dish: string){this.menu.lunch_dishes.push(dish);}

    deleteLunchDish(dish: string){this.menu.lunch_dishes = this.menu.lunch_dishes.filter(x => x != dish);}
    

    addDinnerDish(dish: string){this.menu.dinner_dishes.push(dish);}

    deleteDinnerDish(dish: string){this.menu.dinner_dishes = this.menu.dinner_dishes.filter(x => x != dish);}


    saveMenu(){
        return this.http.put(this.menuUrl, this.menu);
    }


}
