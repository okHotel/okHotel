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
  isBorderOnChecked = false;

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

  checkAndChangeInputBorders() {

    console.log('into checkAndChangeInputBorders');

    if (localStorage.getItem('isBorderOnChecked') === 'true') {
      const formInput = document.querySelectorAll('.md-form');

      this.isBorderOnChecked = true;

      console.log(formInput);

      for (let i = 0; i < formInput.length; i++) {
        console.log(i);
        formInput.item(i).classList.add('border-input');
        formInput.item(i).classList.remove('md-form');
      }
    } else if (localStorage.getItem('isBorderOnChecked') === 'false') {
      const formInput = document.querySelectorAll('.border-input');

      this.isBorderOnChecked = false;

      for (let i = 0; i < formInput.length; i++) {
        formInput.item(i).classList.add('md-form');
        formInput.item(i).classList.remove('border-input');
      }

    }
  }

}
