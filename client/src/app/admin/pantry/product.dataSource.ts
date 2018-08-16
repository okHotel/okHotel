import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {PantryService} from "../../service/pantry/pantry.service";
import {Product} from "./product";

export class ProductDataSource extends DataSource<Product> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Product[] = [];
    renderedData: Product[] = [];

    constructor(public _pantryService: PantryService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Product[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._pantryService.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];

        this._pantryService.getProducts();

        return Observable.merge(...displayDataChanges).map(() => {
            // Filter data
            this.filteredData = this._pantryService.data.slice().filter((product: Product) => {
                const searchStr = (product.code + product.name +
                    product.category + product.quantity + product.unit).toString().toLowerCase();
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
    sortData(data: Product[]): Product[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'category': [propertyA, propertyB] = [a.category, b.category]; break;
                case 'quantity': [propertyA, propertyB] = [a.quantity, b.quantity]; break;
                case 'unit': [propertyA, propertyB] = [a.unit, b.unit]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}