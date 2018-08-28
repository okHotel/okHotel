import { Component, OnInit } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import construct = Reflect.construct;
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})

export class AdminProfileComponent implements OnInit {

  isLoading = false;
  services = [new Service('Restaurant', 'restaurant', true),
      new Service('Product', 'view_list', true),
  new Service('Swimming Pool', 'pool', false),
  new Service( 'Beach', 'beach_access', false)];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.router.navigateByUrl('/');
  }

}

export class Service {

    constructor(public name: String, public icon: String, public isEnabled: Boolean) { }
}
