import { Injectable } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  fontSize;
  large = false;
  medium = false;
  small = false;

  isDefaultTheme: boolean = true;
  themeClass: string = 'light-theme';

  backgroundCheckValue = true;
  isBorderOnChecked = false;
  isContrastChecked = false;

  constructor(public overlayContainer: OverlayContainer) { }

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

  isUseBackgroundOn(): boolean {
    console.log('background');
    console.log(this.backgroundCheckValue);
    return this.backgroundCheckValue || localStorage.getItem('useBackground') === 'true';
  }

  checkAndChangeTextContrast() {
    console.log('into checkAndChangeTextContrast');

    let text;
    let placeholder;
    let select;
    let cellHeader;
    let selectBorder;

    if (this.isContrastChecked || localStorage.getItem('isContrastChecked') === 'true') {
      text = document.querySelectorAll('.contrast');
      placeholder = document.querySelectorAll('.form-control');
      select = document.querySelectorAll('.mat-select-placeholder');
      cellHeader = document.querySelectorAll('mat-header-cell');
      selectBorder = document.querySelectorAll('mat-select');

      this.isContrastChecked = true;

      for (let i = 0; i < text.length; i++) {
        text.item(i).classList.remove('dark-grey-text');
        text.item(i).classList.add('text-dark');
      }

      for (let i = 0; i < placeholder.length; i++) {
        placeholder.item(i).classList.add('black-placeholder');
      }

      for (let i = 0; i < select.length; i++) {
        select.item(i).classList.remove('mat-select-placeholder');
        select.item(i).classList.add('mat-select-black-placeholder');
      }

     for (let i = 0; i < select.length; i++) {
        select.item(i).classList.remove('mat-select-placeholder');
        select.item(i).classList.add('mat-select-black-placeholder');
      }

      for (let i = 0; i < cellHeader.length; i++) {
        cellHeader.item(i).classList.add('mat-header-cell-black');
      }

      for (let i = 0; i < selectBorder.length; i++) {
        selectBorder.item(i).classList.add('mat-select-black');
      }

    }
  }

  onThemeChange() {
    this.isDefaultTheme = !this.isDefaultTheme;

    this.themeClass = this.isDefaultTheme ? 'light-theme' : 'dark-theme';


    console.log(this.isDefaultTheme);
    console.log(this.themeClass);
  }
}
