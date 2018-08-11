import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product, Unit} from "./product";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Subject} from "rxjs";
import {BarcodeDecoderService} from "../../service/pantry/barcode-scanner/barcode-decoder.service";
import {BarcodeValidatorService} from "../../service/pantry/barcode-scanner/barcode-validator.service";
import {PantryService} from "../../service/pantry/pantry.service";

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

    displayedColumns = ['code', 'name', 'category', 'quantity', 'unit'];
    dataSource: MatTableDataSource<Product> = new MatTableDataSource();
    lastResult: any;
    message: string;
    error: string;

    code$ = new Subject<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('interactive') interactive;

    constructor(private decoderService: BarcodeDecoderService, private barcodeValidator: BarcodeValidatorService,
                private pantryService: PantryService) {}

    ngOnInit() {

        this.pantryService.getPantry().subscribe(
            res => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );

        this.decoderService.onLiveStreamInit();
        this.decoderService.onDecodeProcessed();
        this.decoderService
            .onDecodeDetected()
            .then(code => {
                this.lastResult = code;
                this.decoderService.onPlaySound();
                this.code$.next(code);
                this.applyFilter(code.toString());
                console.log(code)
            })
            .catch((err) => this.error = `Something Wrong: ${err}`);

        this.barcodeValidator
            .doSearchbyCode(this.code$)
            .subscribe(
                res => this.message = res,
                err => {
                    this.message = `An Error! ${err.json().error}`;
                },
            );
    }

    ngAfterContentInit() {
        this.interactive.nativeElement.children[0].style.position = 'absolute';
    }

    ngAfterViewInit() {

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    ngOnDestroy() {
        this.decoderService.onDecodeStop();
    }
}