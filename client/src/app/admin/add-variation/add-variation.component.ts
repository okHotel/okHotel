import {Component, OnInit} from '@angular/core';
import {VariationService} from '../../service/variation/variation.service';
import {Variation} from './variation';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ThemingService} from '../../service/theming/theming.service';

@Component({
    selector: 'app-add-variation',
    templateUrl: './add-variation.component.html',
    styleUrls: ['./add-variation.component.scss']
})
export class AddVariationComponent implements OnInit {

    variations: Variation[] = [];
    variation = new Variation();
    map: Map<number, String> = new Map<number, String>();

    constructor(private router: Router,
                private variationService: VariationService,
                private location: Location,
                public themingService: ThemingService) {
      if (this.themingService.isUseBackgroundOn()) {
        document.body.style.backgroundImage = "url('../../assets/images/restaurant.jpg')";
        document.body.style.backgroundRepeat = "repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
      }
    }

    ngOnInit() {
        let i = 0;
        this.variationService.getVariations()
            .subscribe( variations => this.variations = variations);

        console.log(this.variations);
        this.variation.type = '';

      this.themingService.checkAndChangeInputBorders();
      this.themingService.checkAndChangeTextContrast();
      this.themingService.setCurrentTheme();

    }

    public addVariation(type: string) {
        const variation: Variation = new Variation();
        variation.type = type;

        this.variationService.addVariation(variation)
            .subscribe(res => console.log(res), err => {
              console.log('errore:');
              console.log(err);
            });
        this.variations.push(variation);
        this.variation.type = '';
    }

    public isInputInValid(type: string) {
        return type.length === 0 || !type.match('^[a-zA-Z]+$');
    }

    public deleteVariation(variation: Variation) {
        this.variationService.deleteVariation(variation)
            .subscribe();

      this.variations = this.variations.filter(x => x !== variation);
    }

    public goBack() {
      this.location.back();
    }


  public goToStatistics() {
      this.router.navigateByUrl('admin/restaurant');
  }
    /*public getErrorMessage() {
    }*/
}
