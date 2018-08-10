import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product, Unit} from "./product";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

    displayedColumns = ['code', 'name', 'category', 'quantity'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    error: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /*
      products = [new FoodCategory('Pasta', [new Food('Fusilli', 34), new Food('Penne',5)]),
                  new FoodCategory('Verdure', [new Food('Fagiolini', 23), new Food('Carciofi', 6), new Food('Mais',6)]),
                  new FoodCategory('Dolce', [new Food('Cacao',44), new Food('Vanillina', 33), new Food('Cioccolato Fondente',6)])
      ]
    */

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}

const ELEMENT_DATA: Product[] = [
    {code: 1, name: 'Spaghetti', category: 'pasta', quantity: 1, unit: Unit.PACKAGES},
    {code: 2, name: 'Latte', category: 'colazioni', quantity: 10, unit: Unit.L},
    {code: 4, name: 'Passata di pomodoro', category: 'conserve', quantity: 6, unit: Unit.L},
    {code: 10, name: 'Olio', category: 'condimenti', quantity: 10, unit: Unit.L},
    {code: 3, name: 'Sale', category: 'condimenti', quantity: 100, unit: Unit.KG},
    {code: 5, name: 'Fagiolini', category: 'verdure', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Fusilli', category: 'pasta', quantity: 13, unit: Unit.KG},
    {code: 5, name: 'Carciofi', category: 'verdure', quantity: 20, unit: Unit.KG}

];
