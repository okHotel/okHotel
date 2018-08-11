import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product, Unit} from "./product";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Subject} from "rxjs";
import {BarcodeDecoderService} from "../../service/pantry/barcode-scanner/barcode-decoder.service";
import {BarcodeValidatorService} from "../../service/pantry/barcode-scanner/barcode-validator.service";

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

    displayedColumns = ['code', 'name', 'category', 'quantity'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    lastResult: any;
    message: string;
    error: string;

    code$ = new Subject<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('interactive') interactive;

    constructor(private decoderService: BarcodeDecoderService, private barcodeValidator: BarcodeValidatorService) {};

    ngOnInit() {
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

const ELEMENT_DATA: Product[] = [
    {code: 1, name: 'Spaghetti', category: 'pasta', quantity: 1, unit: Unit.PACKAGES},
    {code: 5012345678900, name: 'Latte', category: 'colazioni', quantity: 10, unit: Unit.L},
    {code: 4, name: 'Passata di pomodoro', category: 'conserve', quantity: 6, unit: Unit.L},
    {code: 10, name: 'Olio', category: 'condimenti', quantity: 10, unit: Unit.L},
    {code: 3, name: 'Sale', category: 'condimenti', quantity: 100, unit: Unit.KG},
    {code: 5, name: 'Fagiolini', category: 'verdure', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Fusilli', category: 'pasta', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Cacao', category: 'dolce', quantity: 100, unit: Unit.KG},
    {code: 5, name: 'Carciofi', category: 'verdure', quantity: 20, unit: Unit.KG}

];
