import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation} from "../../reservation/reservation";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private baseUrl = 'http://localhost:3000';
    private customersUrl = this.baseUrl + '/reservations';  // URL to web api
    constructor(
        private http: HttpClient
    ) { }

    getReservations (): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(this.customersUrl);
    }

    getReservation (id: string): Observable<Reservation> {
        const url = `${this.customersUrl}/${id}`;
        return this.http.get<Reservation>(url);
    }

    deleteReservation (reservation: Reservation | string): Observable<Reservation> {
        const id = typeof reservation === 'string' ? reservation : reservation._id;
        const url = `${this.customersUrl}/${id}`;

        return this.http.delete<Reservation>(url, httpOptions);
    }

    updateReservation (reservation: Reservation): Observable<any> {
        return this.http.put(this.customersUrl, reservation, httpOptions);
    }

}