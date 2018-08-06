import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../../admin/make-menu-view/menu';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class MenuService {

  private baseUrl = 'http://localhost:3000';
  private menuUrl = this.baseUrl + '/menu';  // URL to web api

  public lunchDishes: string[];
  public dinnerDishes: string[];

  constructor(  private http: HttpClient) { }


  getDateMenu(date: Date): Observable<Menu> {
      const url = `${this.menuUrl}/${date}`;
      return this.http.get<Menu>(url);
  }

  setLunchDishes(ld: string[]){this.lunchDishes = ld;}

  setDinnerDishes(dd: string[]){this.dinnerDishes = dd;}



}
