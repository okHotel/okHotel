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
    console.log(localStorage.getItem('fontSize'))

    if (localStorage.getItem('fontSize') === 'large') {
      this.themingService.large = localStorage.getItem('fontSize') === 'large';
    } else if (localStorage.getItem('fontSize') === 'medium') {
      this.themingService.medium = localStorage.getItem('fontSize') === 'medium';
    } else if (localStorage.getItem('fontSize') === 'small') {
      this.themingService.small = localStorage.getItem('fontSize') === 'small';
    }

    if (localStorage.getItem('isBorderOn') === 'true') {
      console.log('aaaaaaaaaa');
      this.themingService.isBorderOn = true;
      const formInput = document.getElementsByClassName('md-form')[0];
      formInput.classList.remove('md-form');
    }

    console.log('APP COMPONENT');
    console.log(localStorage);
  }

}

