import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Variation} from '../../admin/add-variation/variation';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';




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
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      return this.http.get<Variation[]>(this.variationsUrl, {headers: httpHeaders});
    }

    addVariation(variation: Variation): Observable<any> {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      return this.http.put<Variation[]>(this.variationsUrl, variation, {headers: httpHeaders});
    }

    deleteVariation(id: String) {
      let httpHeaders = AuthService.getHeaderWithAuthorization();

      const url = `${this.variationsUrl}/${id}`;
        return this.http.delete(url, {headers: httpHeaders});
    }


}
