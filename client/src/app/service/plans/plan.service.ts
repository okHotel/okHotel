import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Plan} from '../../home/home';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

    private baseUrl = 'http://localhost:3000';
    private plansUrl = this.baseUrl + '/plan';  // URL to web api

    constructor(private http: HttpClient) {  }

    getPlans(): Observable<Plan[]>{
        return this.http.get<Plan[]>(this.plansUrl);
    }

}
