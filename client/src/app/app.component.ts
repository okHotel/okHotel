import { Component } from '@angular/core';
import { HandleHeaderService} from './handleHeader.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [HandleHeaderService]
})
export class AppComponent {
  title = 'app';
}
