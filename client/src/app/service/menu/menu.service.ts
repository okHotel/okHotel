import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../../menu/menu';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    public showVariations = false;
    private baseUrl = 'http://localhost:3000';
    private menuUrl = this.baseUrl + '/menu';  // URL to web api

    public menu: Menu = new Menu();

    constructor(private http: HttpClient) { }

    setDate(date: Date) {
        this.menu.date = date;
    }

    getDateMenu(): Observable<Menu> {
        const url = `${this.menuUrl}/${this.menu.date}`;
        return this.http.get<Menu>(url);
    }

    setMenu(menu1: Menu) {
        this.menu = menu1;
    }

    addLunchDish(dish: string){this.menu.lunch_dishes.push(dish);}

    deleteLunchDish(dish: string){this.menu.lunch_dishes = this.menu.lunch_dishes.filter(x => x != dish);}

    addDinnerDish(dish: string){this.menu.dinner_dishes.push(dish);}

    deleteDinnerDish(dish: string){this.menu.dinner_dishes = this.menu.dinner_dishes.filter(x => x != dish);}

    saveMenu(): Observable<any> {

        console.log(this.menu);
        let url = "";

        if ( this.menu._id === undefined) {
             url = `${this.menuUrl}/create`;
        } else {
             url = `${this.menuUrl}/update`;
        }
        return this.http.put(url, this.menu, httpOptions);
    }

    deleteMenu() {
        const url = `${this.menuUrl}/${this.menu.date}`;
        return this.http.delete(url);
    }

}
