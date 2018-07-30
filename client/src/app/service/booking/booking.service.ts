import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "../../booking/booking";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private baseUrl = 'http://localhost:3000';
    private bookingsUrl = this.baseUrl + '/bookings';  // URL to web api
    constructor(
        private http: HttpClient
    ) { }

    getBookings (): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.bookingsUrl);
    }

    getBooking (id: string): Observable<Booking> {
        const url = `${this.bookingsUrl}/${id}`;
        return this.http.get<Booking>(url);
    }

    deleteBooking (booking: Booking | string): Observable<Booking> {
        const id = typeof booking === 'string' ? booking : booking._id;
        const url = `${this.bookingsUrl}/${id}`;

        return this.http.delete<Booking>(url, httpOptions);
    }

    updateReservation (booking: Booking): Observable<any> {
        return this.http.put(this.bookingsUrl, booking, httpOptions);
    }

    getRoomsNumber (): Observable<number[]> {
        const url = `${this.bookingsUrl}/roomsNumber`;
        return this.http.get<number[]>(url);
    }

}