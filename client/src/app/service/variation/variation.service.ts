import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Variation} from '../../admin/add-variation/variation';
import {HttpClient} from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class VariationService {
    private baseUrl = 'http://localhost:3000';
    // '/variations' è il percorso preso da server.js
    private variationsUrl = this.baseUrl + '/variations';  // URL to web api

    constructor(private http: HttpClient) { }

    /**
     * metodo per fare una chiamata http al server,
     * chiedendo le variations e
     * passando url e header
     */
    getVariations(): Observable<Variation[]> {
        return this.http.get<Variation[]>(this.variationsUrl);
    }

    addVariation(variation: Variation): Observable<any> {

        return this.http.put<Variation[]>(this.variationsUrl, variation);
    }

    deleteVariation(type: String): Observable<any> {

        return this.http.put<Variation[]>(this.variationsUrl, type);
    }
}
