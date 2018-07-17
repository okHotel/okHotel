import { Component, OnInit } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import construct = Reflect.construct;

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})

export class AdminProfileComponent implements OnInit {

  isLoading = false;
  servicies = [new Service('Resturant', 'restaurant'),
      new Service('Pantry', 'view_list'),
  new Service('Swimming Pool', 'pool'),
  new Service( 'Beach', 'beach_access')];

  constructor() { }

  ngOnInit() {
  }


}

export class Service {

    constructor(public name: String, public icon: String) { }
}
