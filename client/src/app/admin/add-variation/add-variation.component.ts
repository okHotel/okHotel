import {Component, OnInit} from '@angular/core';
import {VariationService} from '../../service/variation/variation.service';
import {Variation} from './variation';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'app-add-variation',
    templateUrl: './add-variation.component.html',
    styleUrls: ['./add-variation.component.scss']
})
export class AddVariationComponent implements OnInit {

    variations: String[] = [];
    variation = new Variation();
    map: Map<number, String> = new Map<number, String>();

    constructor(private router: Router,
                private variationService: VariationService,
                private location: Location) {

      document.body.style.backgroundImage = "url('../../assets/images/restaurant.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";

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
            .subscribe(res => console.log(res), err => {
              console.log('errore:');
              console.log(err);
            });
        this.variations.push(type);
    }

    public isInputInValid(type: string) {
        return type.length === 0 || !type.match('^[a-zA-Z]+$');
    }

    public deleteVariation(variation: string, i: number) {
        const id = this.map.get(i);

        this.variationService.deleteVariation(id)
            .subscribe();

      this.variations = this.variations.filter(x => x !== variation);
    }

    public goBack() {
      this.location.back();
    }


  public goToStatics() {
      this.router.navigateByUrl('admin/restaurant');
  }
    /*public getErrorMessage() {
    }*/
}
