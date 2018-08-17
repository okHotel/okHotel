import { Component, OnInit } from '@angular/core';
import {VariationService} from '../../service/variation/variation.service';
import {Variation} from './variation';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-variation',
    templateUrl: './add-variation.component.html',
    styleUrls: ['./add-variation.component.css']
})
export class AddVariationComponent implements OnInit {

    variations: String[] = [];
    variation = new Variation();

    constructor(private router: Router, private variationService: VariationService) {

    }

    ngOnInit() {

        this.variationService.getVariations()
            .subscribe( variations => {
                variations.forEach((obj) => {
                    this.variations.push(obj.type);
                });
            });
        this.variation.type = '';
    }



    public addVariation(type: string) {
        this.variation.type = type;
        this.variationService.addVariation(this.variation)
            .subscribe();
    }

}
