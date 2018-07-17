import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HandleHeaderService} from '../handleHeader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(private router: Router, private handleHeader: HandleHeaderService) {
  }

  ngOnInit() {
  }

  home() {
    if(this.handleHeader.getState()) {
        this.router.navigateByUrl('/home');
    }
  }

}
