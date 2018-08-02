import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoginError : boolean = false;
    username: string;
    password: string;

    constructor(private customerService: CustomerService, private router : Router) { }

    ngOnInit() {
    }

    login(){
        this.customerService.login(this.username, this.password).subscribe((data : any)=>{
                this.router.navigate(['/']);
            },
            (err : HttpErrorResponse)=>{
                this.isLoginError = true;
                // print login failed due to wrong username or password
                console.log(err)
            });
    }

}