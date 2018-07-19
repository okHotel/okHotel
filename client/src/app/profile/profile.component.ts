import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = 'Federica';
  isAdmin = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  profile() {
    if(this.isAdmin){
        this.router.navigateByUrl('/admin-profile' );
    } else {
        this.router.navigateByUrl('/profile' );
    }

  }

}
