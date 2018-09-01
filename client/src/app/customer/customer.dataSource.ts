import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Customer} from "./customer";
import {CustomerService} from "../service/customer/customer.service";

export class CustomerDataSource extends DataSource<Customer> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Customer[] = [];
    renderedData: Customer[] = [];

    constructor(public _customerService: CustomerService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Customer[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._customerService.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._customerService.getCustomers();

        return Observable.merge(...displayDataChanges).map(() => {
            // Filter data
            this.filteredData = this._customerService.data.slice().filter((customer: Customer) => {
                const searchStr = (customer.bookingName + customer.bookingSurname).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });

            // Sort filtered data
            const sortedData = this.sortData(this.filteredData.slice());

            // Grab the page's slice of the filtered sorted data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
            return this.renderedData;
        });
    }

    disconnect() {

    }

    /** Returns a sorted copy of the database data. */
    sortData(data: Customer[]): Customer[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'bookingName': [propertyA, propertyB] = [a.bookingName, b.bookingName]; break;
                case 'bookingSurname': [propertyA, propertyB] = [a.bookingSurname, b.bookingSurname]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
