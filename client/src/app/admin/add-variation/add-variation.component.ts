import {Component, OnInit} from '@angular/core';
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
    map: Map<number, String> = new Map<number, String>();

    constructor(private router: Router, private variationService: VariationService) {

    }

    ngOnInit() {

        let i = 0;
        this.variationService.getVariations()
            .subscribe( variations => {
                variations.forEach((obj) => {
                    this.variations.push(obj.type);
                    this.map.set(i, obj._id);
                    i++;
                });
            });

        console.log(this.variations);
        this.variation.type = '';
    }

    public addVariation(type: string) {
        this.variation.type = type;
        this.variationService.addVariation(this.variation)
            .subscribe();
        location.reload();
    }

    public isInputInValid(type: string) {
        return type.length === 0 || !type.match('^[a-zA-Z]+$');
    }

    public deleteVariation(i: number) {
        const id = this.map.get(i);

        this.variationService.deleteVariation(id)
            .subscribe();
        location.reload();
    }

    /*public getErrorMessage() {
    }*/
}
