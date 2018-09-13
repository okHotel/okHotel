import { Component } from '@angular/core';
import {ThemingService} from './service/theming/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public themingService: ThemingService) {

  }

  ngOnInit() {
    if (localStorage.getItem('fontSize') === 'large') {
      this.themingService.large = localStorage.getItem('fontSize') === 'large';
    } else if (localStorage.getItem('fontSize') === 'medium') {
      this.themingService.medium = localStorage.getItem('fontSize') === 'medium';
    } else if (localStorage.getItem('fontSize') === 'small') {
      this.themingService.small = localStorage.getItem('fontSize') === 'small';
    }
  }

}

