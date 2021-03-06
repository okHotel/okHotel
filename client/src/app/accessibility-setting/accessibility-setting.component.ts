import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ThemingService} from '../service/theming/theming.service';
import {el} from '../../../node_modules/@angular/platform-browser/testing/src/browser_util';
import {Theme} from '../custom-theme/theme';

@Component({
  selector: 'app-accessibility-setting',
  templateUrl: './accessibility-setting.component.html',
  styleUrls: ['./accessibility-setting.component.scss']
})
export class AccessibilitySettingComponent implements OnInit {

  theme = Theme;

  constructor(public themingService: ThemingService) { }

  ngOnInit() {

  }

  closeSidebar() {
    console.log(HeaderComponent.isAccessibilitySidebarOpen);
    HeaderComponent.isAccessibilitySidebarOpen = false;
    console.log(HeaderComponent.isAccessibilitySidebarOpen);
  }

  setCustomFontSize() {
    this.themingService.small = false;
    this.themingService.medium = false;
    this.themingService.large = false;

    localStorage.setItem('fontSize', '' + this.themingService.fontSize);
    console.log(localStorage.getItem('fontSize'))
  }

  setLargeFont() {
    this.themingService.small = false;
    this.themingService.medium = false;
    this.themingService.large = true;
    localStorage.setItem('fontSize', '150');
    console.log(localStorage);
  }

  setMediumFont() {
    this.themingService.small = false;
    this.themingService.medium = true;
    this.themingService.large = false;
    localStorage.setItem('fontSize', '125');
  }

  setSmallFont() {
    this.themingService.small = true;
    this.themingService.medium = false;
    this.themingService.large = false;
    localStorage.setItem('fontSize', '100');
  }

  changeInputBorder(state: boolean) {
    this.themingService.isBorderOnChecked = state;
    localStorage.setItem('isBorderOnChecked', '' + this.themingService.isBorderOnChecked);
    this.themingService.checkAndChangeInputBorders();

    console.log(localStorage);
  }

  changeBackgroundImagesCheckValue() {
    this.themingService.backgroundCheckValue = !this.themingService.backgroundCheckValue;
    localStorage.setItem('useBackground', ''+this.themingService.backgroundCheckValue);
    location.reload();
    console.log(localStorage);
  }

  changeTextContrast() {
    this.themingService.isContrastChecked = !this.themingService.isContrastChecked;
    localStorage.setItem('isContrastChecked', '' + this.themingService.isContrastChecked);

    if (this.themingService.isContrastChecked) {
      this.themingService.checkAndChangeTextContrast();
    } else {
      location.reload();
    }

    console.log(localStorage)
  }

  resetSettings() {
    let token: string;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    localStorage.clear();

    if (token) {
      localStorage.setItem('token', token);
    }

    location.reload();

  }
}
