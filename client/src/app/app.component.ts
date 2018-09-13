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

}

