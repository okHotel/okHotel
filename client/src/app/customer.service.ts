import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Customer } from './customer';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CustomerService {

    private customersUrl = 'api/customers';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /** GET heroes from the server */
    getCustomers (): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.customersUrl)
            .pipe(
                tap(customers => this.log('fetched customers')),
                catchError(this.handleError('getCustomers', []))
            );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getCustomerNo404<Data>(id: number): Observable<Customer> {
        const url = `${this.customersUrl}/?id=${id}`;
        return this.http.get<Customer[]>(url)
            .pipe(
                map(customers => customers[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hero id=${id}`);
                }),
                catchError(this.handleError<Customer>(`getHero id=${id}`))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getCustomer(bookingName: string, bookingSurname: string): Observable<Customer> {
        const url = `${this.customersUrl}/${bookingName}-${bookingSurname}`;
        return this.http.get<Customer>(url).pipe(
            tap(_ => this.log(`fetched hero booking name=${bookingName} booking surname=${bookingSurname}`)),
            catchError(this.handleError<Customer>(`getHero booking name=${bookingName} booking surname=${bookingSurname}`))
        );
    }

    /* GET heroes whose name contains search term */
    searchCustomers(term: string): Observable<Customer[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Customer[]>(`${this.customersUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Customer[]>('searchHeroes', []))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
