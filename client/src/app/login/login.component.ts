import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../service/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoginError : boolean = false;
    username: string;
    password: string;

    constructor(private customerService: CustomerService, private authService: AuthService, private router : Router) { }

    ngOnInit() {
    }

    login(){
        this.authService.login(this.username, this.password).subscribe((user : any)=>{
            let token = user && user.token;
            if (token) {
                // set token property
                this.authService.setToken(token);
                // store username and jwt token in local storage to keep user     //logged in between page refreshes
                localStorage.setItem('token', token );

                console.log(localStorage);

                this.router.navigate(['/']);
            }},
            (err : HttpErrorResponse)=>{
                this.isLoginError = true;
                // print login failed due to wrong username or password
                console.log(err)
            });
    }

    navigateToRegistration() {
        this.router.navigate(['/registration']);
    }

    logout() {
        localStorage.removeItem('token')
        console.log(localStorage);
    }
}