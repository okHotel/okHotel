import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  static isAccessibilitySidebarOpen: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {}

  get myStyle() {
    return {
      'width': HeaderComponent.isAccessibilitySidebarOpen ? '40%' : '0',
      'padding': HeaderComponent.isAccessibilitySidebarOpen ? '5%' : '0',
      'transition': '0.5s'
    };
  }

  home() {
      this.router.navigateByUrl('');
  }

  isLoggedIn() {
   return AuthService.isLoggedIn();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    AuthService.logout();
    this.router.navigateByUrl('/login');
  }

  changeAccessibilitySidebarStatus() {
    HeaderComponent.isAccessibilitySidebarOpen = !HeaderComponent.isAccessibilitySidebarOpen;
  }
}
