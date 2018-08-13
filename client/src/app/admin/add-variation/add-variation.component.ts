import { Component, OnInit } from '@angular/core';
import {VariationService} from '../../service/variation/variation.service';

@Component({
    selector: 'app-add-variation',
    templateUrl: './add-variation.component.html',
    styleUrls: ['./add-variation.component.css']
})
export class AddVariationComponent implements OnInit {

    variations: String[] = [];

    constructor(private variationService: VariationService) {

    }

    ngOnInit() {

        this.variationService.getVariations()
            .subscribe( variations => {
                variations.forEach((obj) => {
                    this.variations.push(obj.type);
                })
            });
    }

}
