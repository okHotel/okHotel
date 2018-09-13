import { Component, OnInit } from '@angular/core';
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

  increaseFontSize() {
    this.themingService.big = true;
  }

}
