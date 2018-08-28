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
import {ProductDataSource} from "./product.dataSource";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {DeleteProductComponent} from "./delete-product/delete-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {Product} from "./product";
import {BarcodeDecoderService} from "../../service/pantry/barcode-scanner/barcode-decoder.service";
import {BarcodeValidatorService} from "../../service/pantry/barcode-scanner/barcode-validator.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    displayedColumns = ['code', 'name', 'category', 'quantity', 'unit', 'actions'];
    productService: PantryService | null;
    dataSource: ProductDataSource | null;
    index: number;
    id: string;

    lastResult: any;
    message: any;
    error: any;
    code$ = new Subject<any>();
    @ViewChild('interactive') interactive;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;
    barcode;

    constructor(public httpClient: HttpClient,
                public dialog: MatDialog,
                public dataService: PantryService,
                private decoderService: BarcodeDecoderService,
                private barcodeValidator: BarcodeValidatorService) {}

    ngOnInit() {
        this.loadData();

        this.decoderService.onLiveStreamInit();
        this.decoderService.onDecodeProcessed();

        this.decoderService
            .onDecodeDetected()
            .then(code => {
                this.lastResult = code;
                this.decoderService.onPlaySound();
                this.code$.next(code);
                this.barcode = code;
                this.dataSource.filter = code.toString();
                this.filter.nativeElement.value = code.toString();
//                console.log(code)
            })
            .catch((err) => this.error = `Something Wrong: ${err}`);

        this.barcodeValidator
            .doSearchbyCode(this.code$)
            .subscribe();
    }

    refresh() {
        this.loadData();
    }

    addNew() {
        let code;
        if (this.barcode != undefined) {
            code = this.barcode;
        }
        const dialogRef = this.dialog.open(AddProductComponent, {
            data: {code: code}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // After dialog is closed we're doing frontend updates
                // For add we're just pushing a new row inside DataService
                this.productService.dataChange.value.push(this.dataService.getDialogData());
                // this.refreshTable();
                this.loadData();
            }
        });
    }

    startEdit(i: number, _id: string, code: string, name: string, category: string, quantity: number, unit: string) {
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
//                this.refreshTable();
                this.loadData();
            }
        });
    }

    deleteItem(i: number, _id: string, code: string, name: string, quantity: number, category: string, unit: string) {
        this.index = i;
        this.id = code;
        const dialogRef = this.dialog.open(DeleteProductComponent, {
            data: {_id: _id, code: code, name: name, category: quantity, quantity: category, unit: unit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {

/*
                const foundIndex = this.productService.dataChange.value.findIndex(x => x.code === this.id);
                // for delete we use splice in order to remove single object from DataService
                this.productService.dataChange.value.splice(foundIndex, 1);
*/
                this.loadData();
//                this.refreshTable();
            }
        });
    }

    public refreshTable() {
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
            console.log('int refresh table')
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

    ngAfterContentInit() {
        this.interactive.nativeElement.children[0].style.position = 'absolute';
    }

    ngOnDestroy() {
        this.decoderService.onDecodeStop();
    }
}
