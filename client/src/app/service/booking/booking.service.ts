import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Reservation} from "../../customer/reservation";

@Injectable()
export class BookingService {
    private serverApi = 'http://localhost:3000';

    constructor(private http: Http) {}

    public getBookedCustomer(bookingName: string, bookingSurname: string): Observable<Reservation> {
        const URI = `${this.serverApi}/booking/${bookingSurname}`;
        console.log(URI);
        return this.http.get(URI)
            .map(res => {
                console.log('res in service =>')
                console.log(res);
                return res.json();
            });
    }

/*
    public getRoomsNumber(): Observable<Reservation[]> {
        const URI = `${this.serverApi}/booking/rooms/number`;
        console.log(URI);
        return this.http.get(URI)
            .map(res => res.json())
            .map(res => <Reservation[]>res.reservations);
    }
*/

    public getAllReservations(): Observable<Reservation[]> {
        const URI = `${this.serverApi}/booking/`;
        console.log(URI);
        return this.http.get(URI)
            .map(res => res.json())
            .map(res => <Reservation[]>res.reservations);    }

}

