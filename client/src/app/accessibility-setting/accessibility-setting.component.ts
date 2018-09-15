import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ThemingService} from '../service/theming/theming.service';

@Component({
  selector: 'app-accessibility-setting',
  templateUrl: './accessibility-setting.component.html',
  styleUrls: ['./accessibility-setting.component.scss']
})
export class AccessibilitySettingComponent implements OnInit {

  constructor(public themingService: ThemingService) { }

  ngOnInit() {
  }

  closeSidebar() {
    console.log(HeaderComponent.isAccessibilitySidebarOpen);
    HeaderComponent.isAccessibilitySidebarOpen = false;
    console.log(HeaderComponent.isAccessibilitySidebarOpen);
  }

  setLargeFont() {
    this.themingService.small = false;
    this.themingService.medium = false;
    this.themingService.large = true;
    localStorage.setItem('fontSize', 'large');
    console.log(localStorage);
  }

  setMediumFont() {
    this.themingService.small = false;
    this.themingService.medium = true;
    this.themingService.large = false;
    localStorage.setItem('fontSize', 'medium');
  }

  setSmallFont() {
    this.themingService.small = true;
    this.themingService.medium = false;
    this.themingService.large = false;
    localStorage.setItem('fontSize', 'small');
  }

  changeInputBorder() {
    this.themingService.isBorderOnChecked = !this.themingService.isBorderOnChecked;
    localStorage.setItem('isBorderOnChecked', '' + this.themingService.isBorderOnChecked);
    this.themingService.checkAndChangeInputBorders();

    console.log(localStorage);
  }

  changeBackgroundImagesCheckValue() {
    this.themingService.backgroundCheckValue = !this.themingService.backgroundCheckValue;
    localStorage.setItem('useBackground', ''+this.themingService.backgroundCheckValue);
    console.log(localStorage);
  }

  changeTextContrast() {
    this.themingService.isContrastChecked = !this.themingService.isContrastChecked;
    localStorage.setItem('isContrastChecked', '' + this.themingService.isContrastChecked);
    this.themingService.checkAndChangeTextContrast();
  }
}
