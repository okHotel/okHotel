import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product, Unit} from "./product/product";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ELEMENT_DATA, PantryService} from "../../service/pantry/pantry.service";

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

    displayedColumns = ['code', 'name', 'category', 'quantity'];
    dataSource;
    error: string;
    selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private pantryService: PantryService) {}

    /*
      products = [new FoodCategory('Pasta', [new Food('Fusilli', 34), new Food('Penne',5)]),
                  new FoodCategory('Verdure', [new Food('Fagiolini', 23), new Food('Carciofi', 6), new Food('Mais',6)]),
                  new FoodCategory('Dolce', [new Food('Cacao',44), new Food('Vanillina', 33), new Food('Cioccolato Fondente',6)])
      ]
    */

    //  = new MatTableDataSource(ELEMENT_DATA);
    ngOnInit() {
//      this.pantryService.getPantry().subscribe(res => this.dataSource = new MatTableDataSource(res));
      this.pantryService.getPantry().subscribe(res => this.dataSource = new MatTableDataSource(ELEMENT_DATA));
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

    rowClicked(row) {
        console.log(row);
    }
}
