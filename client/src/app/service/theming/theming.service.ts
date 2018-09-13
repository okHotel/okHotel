import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  /*FONT*/
  large = false;
  medium = false;
  small = false;

  /*INPUT*/
  isBorderOn = false;

  fontSize;
  input;

  constructor() { }

  get myStyle(): any {

    if (this.large) {
      this.fontSize = '150%';
    } else if (this.medium) {
      this.fontSize = '125%';
    } else if (this.small) {
      this.fontSize = '100%';
    }

    return {
      'font-size': this.fontSize
    };
  }


  setBorder(): void {
    const formInput = document.getElementsByClassName('md-form')[0];
    formInput.classList.remove('md-form');
  }

}
