import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CustomerService} from '../service/customer/customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {MessageService} from '../service/message/message.service';
import {ThemingService} from '../service/theming/theming.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  isCustomerLoggedIn: boolean;
  username: string;
  password: string;
  destinationUrl = '';

  constructor(private customerService: CustomerService, private authService: AuthService,
              private router: Router, private route: ActivatedRoute, private error: MessageService,
              public themingService: ThemingService) {
    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('..s/../assets/images/casa-per-ferie-san-bassiano.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.destinationUrl = params['destinationUrl'] || '/');

    this.themingService.checkAndChangeInputBorders();
    this.themingService.checkAndChangeTextContrast();
    this.themingService.setCurrentTheme();
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

          this.router.navigateByUrl("/");
        }},
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        // print login failed due to wrong username or password
        console.log('errore');
        console.log(err);
        this.error.error = err.error.message;
      });
  }

  registration() {
    this.router.navigate(['/registration']);
  }

  resetError() {
    this.error.error = '';
  }

}
