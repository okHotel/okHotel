import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from '../service/customer/customer.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {CustomerDataSource} from "./customer.dataSource";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

    customers: Customer[];
    error: string;

    displayedColumns = ['bookingName', 'bookingSurname', 'actions'];
    dataSource: CustomerDataSource | null;
    message: any;
    index: number;
    id: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private router: Router, private http: HttpClient, public customerService: CustomerService) {}

    ngOnInit(): void {
        this.loadData();
    }

/*
    getCustomers() {
        return this.customerService.getCustomers()
            .subscribe(
                customers => {
                    console.log(customers);
                    this.customers = customers
                }, err => {
                    this.error = err.error.message;
                }
            );
    }
*/

    getDetails(id: string) {
        this.router.navigate(['/customers/' + id])
    }

    addNew() {
        this.router.navigate(['/registration'])
    }

    delete(id: string) {

    }

    private loadData() {
        this.customerService = new CustomerService(this.http);
        this.dataSource = new CustomerDataSource(this.customerService, this.paginator, this.sort);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}