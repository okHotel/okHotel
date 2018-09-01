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
import {Router} from '@angular/router';
import {ErrorService} from '../../service/error/error.service';

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
    id: string;

    lastResult: any;
    message: any;
    error: string;
    code$ = new Subject<any>();
    @ViewChild('interactive') interactive;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;
    barcode;

    constructor(public httpClient: HttpClient,
                public router: Router,
                public dialog: MatDialog,
                public errorService: ErrorService,
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
                console.log(code)
            })
            .catch((err) => this.errorService.error = `Something Wrong: ${err}`);

        this.barcodeValidator
            .doSearchbyCode(this.code$)
            .subscribe();
    }

    addNew() {
        if (this.barcode != undefined) {
          this.router.navigate(['/pantry/add-product/' + this.barcode]);
        } else {
          this.router.navigate(['/pantry/add-product/']);
        }
    }

    startEdit(_id: string) {
      this.router.navigate(['/pantry/edit-product/' + _id]);
    }

    deleteItem(i: number, _id: string, code: string, name: string, quantity: number, category: string, unit: string) {
        this.index = i;
        this.id = code;
        const dialogRef = this.dialog.open(DeleteProductComponent, {
            data: {_id: _id, code: code, name: name, category: quantity, quantity: category, unit: unit}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadData();
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
