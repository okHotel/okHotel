import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {PantryService} from "../../service/pantry/pantry.service";
import {ProductDataSource} from "./ProductDataSource";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {DeleteProductComponent} from "./delete-product/delete-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {Product} from "./product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    displayedColumns = ['code', 'name', 'category', 'quantity', 'unit', 'actions'];
    productService: PantryService | null;
    dataSource: ProductDataSource | null;
    index: number;
    id: number;

    constructor(public httpClient: HttpClient,
                public dialog: MatDialog,
                public dataService: PantryService) {}

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    ngOnInit() {
        this.loadData();
    }

    refresh() {
        this.loadData();
    }

    addNew(product: Product) {
        const dialogRef = this.dialog.open(AddProductComponent, {
            data: {product: product }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // After dialog is closed we're doing frontend updates
                // For add we're just pushing a new row inside DataService
                this.productService.dataChange.value.push(this.dataService.getDialogData());
                this.refreshTable();
            }
        });
    }

    startEdit(i: number, _id: string, code: number, name: string, category: string, quantity: number, unit: string) {
        this.id = code;
        // index row is used just for debugging proposes and can be removed
        this.index = i;
        console.log(this.index);
        const dialogRef = this.dialog.open(EditProductComponent, {
            data: { _id: _id, code: code, name: name, category: category, quantity: quantity, unit: unit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                // When using an edit things are little different, firstly we find record inside DataService by id
                const foundIndex = this.productService.dataChange.value.findIndex(x => x.code === this.id);
                // Then you update that record using data from dialogData (values you enetered)
                this.productService.dataChange.value[foundIndex] = this.dataService.getDialogData();
                // And lastly refresh table
                this.refreshTable();
                this.loadData();
            }
        });
    }

    deleteItem(i: number, _id: string, code: number, name: string, quantity: number, category: string, unit: string) {
        this.index = i;
        this.id = code;
        const dialogRef = this.dialog.open(DeleteProductComponent, {
            data: {_id: _id, code: code, name: name, category: quantity, quantity: category, unit: unit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                const foundIndex = this.productService.dataChange.value.findIndex(x => x.code === this.id);
                // for delete we use splice in order to remove single object from DataService
                this.productService.dataChange.value.splice(foundIndex, 1);
                this.refreshTable();
            }
        });
    }


    // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    private refreshTable() {
        // if there's a paginator active we're using it for refresh
        if (this.dataSource._paginator.hasNextPage()) {
            this.dataSource._paginator.nextPage();
            this.dataSource._paginator.previousPage();
            // in case we're on last page this if will tick
        } else if (this.dataSource._paginator.hasPreviousPage()) {
            this.dataSource._paginator.previousPage();
            this.dataSource._paginator.nextPage();
            // in all other cases including active filter we do it like this
        } else {
            this.dataSource.filter = '';
            this.dataSource.filter = this.filter.nativeElement.value;
        }
    }

    public loadData() {
        this.productService = new PantryService(this.httpClient);
        this.dataSource = new ProductDataSource(this.productService, this.paginator, this.sort);
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