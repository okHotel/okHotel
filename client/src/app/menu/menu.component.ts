import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HandleHeaderService} from '../handleHeader.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private handleHeader: HandleHeaderService) { }

  ngOnInit() {
      this.handleHeader.setState(true);
  }

  home() {

    this.router.navigateByUrl('/home' );
  }

  addVariations(){
    this.router.navigateByUrl('/menu-variations' );
  }

}
