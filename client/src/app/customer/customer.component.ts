import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from '../service/customer/customer.service';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {CustomerDataSource} from "./customer.dataSource";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DeleteCustomerComponent} from "./delete-customer/delete-customer.component";
import {ThemingService} from '../service/theming/theming.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

    customers: Customer[];
    error: string;

    displayedColumns = ['bookingName', 'bookingSurname', 'actions'];
    dataSource: CustomerDataSource | null;
    message: string;
    id: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private dialog: MatDialog, private router: Router, private http: HttpClient,
                public customerService: CustomerService,
                public themingService: ThemingService) {

      document.body.style.backgroundImage = "url('../../assets/images/customer.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }

    ngOnInit(): void {
        this.loadData();


/*
      if (localStorage.getItem('fontSize') == 'large') {
        this.themingService.large = localStorage.getItem('fontSize') == 'large';
      } else if (localStorage.getItem('fontSize') == 'medium') {
        this.themingService.large = localStorage.getItem('fontSize') == 'medium';
      } else if (localStorage.getItem('fontSize') == 'small') {
        this.themingService.large = localStorage.getItem('fontSize') == 'small';
      }
*/

      this.themingService.checkAndChangeInputBorders();

      console.log(localStorage.getItem('fontSize'));
    }

    getDetails(id: string) {
        this.router.navigate(['/customers/' + id])
    }

    addNew() {
        this.router.navigate(['/registration'])
    }

    delete(_id: string, bookingName: string, bookingSurname: string, roomNumber: number) {
        this.id = _id;
        const dialogRef = this.dialog.open(DeleteCustomerComponent, {
            data: {_id: _id, bookingName: bookingName, bookingSurname: bookingSurname, roomNumber: roomNumber}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadData();
            }
        });
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
            }, err => {
              this.error = err.error
            });
    }
}
