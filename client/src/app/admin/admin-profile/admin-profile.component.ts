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

  services = [new Service('Restaurant', 'restaurant', true, 'statistics'),
      new Service('Product', 'view_list', true, 'pantry'),
    new Service ('Customers', 'group', true, 'customers'),
  new Service('Swimming Pool', 'pool', false, ''),
  new Service( 'Beach', 'beach_access', false, '')];


  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.router.navigateByUrl('/');
  }

  gotTo(service: Service) {
    if (service.isEnabled) {
      this.router.navigateByUrl(service.path);
    }
  }

}

export class Service {

    constructor(public name: String, public icon: String, public isEnabled: Boolean, public path: string) { }
}
