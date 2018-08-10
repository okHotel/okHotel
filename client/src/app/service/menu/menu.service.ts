import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../../admin/make-menu-view/menu';
import {DatePipe} from '@angular/common';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    private baseUrl = 'http://localhost:3000';
    private menuUrl = this.baseUrl + '/menu';  // URL to web api

    public date: Date;
    public lunchDishes: string[] = [];
    public dinnerDishes: string[] = [];

    constructor(  private http: HttpClient) { }

    setDate(date: Date){
        this.date = date;
    }

    getDateMenu(): Observable<Menu> {

        var datePipe = new DatePipe('en-US');
        let str = datePipe.transform(this.date, 'yyyy-MM-dd'); //TODO use Date and not string

        console.log(str);

        const url = `${this.menuUrl}/${str}`;
        return this.http.get<Menu>(url);
    }

    setLunchDishes(ld: string[]){this.lunchDishes = ld;}

    addLunchDish(dish: string){this.lunchDishes.push(dish);}

    deleteLunchDish(dish: string){this.lunchDishes = this.lunchDishes.filter(x => x != dish);}


    setDinnerDishes(dd: string[]){this.dinnerDishes = dd;}

    addDinnerDish(dish: string){this.dinnerDishes.push(dish);}

    deleteDinnerDish(dish: string){this.dinnerDishes = this.dinnerDishes.filter(x => x != dish);}


}
