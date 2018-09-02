import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CustomerService} from '../service/customer/customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {ErrorService} from '../service/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  isCustomerLoggedIn: boolean;
  username: string;
  password: string;
  destinationUrl = '';

  constructor(private customerService: CustomerService, private authService: AuthService,
              private router: Router, private route: ActivatedRoute, private error: ErrorService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.destinationUrl = params['destinationUrl'] || '/');
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((user : any)=>{
        const token = user && user.token;
        if (token) {
          // set token property
          this.authService.setToken(token);
          // store username and jwt token in local storage to keep user     //logged in between page refreshes
          localStorage.setItem('token', token );

          console.log(localStorage);

          this.router.navigate([this.destinationUrl]);
        }},
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        // print login failed due to wrong username or password
        console.log('errore');
        console.log(err);
        this.error.error = err.error.message;
      });
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
