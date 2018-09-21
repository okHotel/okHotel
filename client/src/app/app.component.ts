import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ThemingService} from './service/theming/theming.service';
import {AlertsService} from './service/alerts/alerts.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild('header') header: ElementRef;

  constructor(
    public themingService: ThemingService,
    public alertService: AlertsService
  ) {}

  ngOnInit() {

    console.log(localStorage);

    if (localStorage.getItem('fontSize') === 'large') {
      this.themingService.large = localStorage.getItem('fontSize') === 'large';
    } else if (localStorage.getItem('fontSize') === 'medium') {
      this.themingService.medium = localStorage.getItem('fontSize') === 'medium';
    } else if (localStorage.getItem('fontSize') === 'small') {
      this.themingService.small = localStorage.getItem('fontSize') === 'small';
    }

    if (localStorage.getItem('useBackground')) {
      this.themingService.backgroundCheckValue = localStorage.getItem('useBackground') === 'true';
    } else {
      this.themingService.backgroundCheckValue = true;
    }

    this.themingService.overlayContainer.getContainerElement().classList.add(this.themingService.themeClass);
  }
}

