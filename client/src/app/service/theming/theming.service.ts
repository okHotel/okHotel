import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  fontSize: number = 80; // default value = 80 %
  big = false;

  constructor() { }

  increaseFontSizeBy(offset: number) {
    this.fontSize = this.fontSize * offset;
  }

  get myStyle(): any {
    return {
      'font-size': this.big ? '26px' : '14px'
    };
  }


}
