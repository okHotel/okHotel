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
    this.themingService.isBorderOn = !this.themingService.isBorderOn;
    localStorage.setItem('isBorderOn', (String)(this.themingService.isBorderOn));

  }

}
