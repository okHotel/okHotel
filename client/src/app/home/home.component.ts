import {Component, OnInit} from '@angular/core';
import {PlanService} from '../service/plans/plan.service';
import {ThemingService} from '../service/theming/theming.service';
import {MessageService} from '../service/message/message.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    floor: String[] = [];
    image: String[] = [];
    slideIndex = 1;
    slidesBinding = [false, true, true];

    constructor(private planService: PlanService,
                public themingService: ThemingService,
                public messageService: MessageService){

      document.body.style.backgroundImage = "none";

    }

    //per ogni record nel db,
    ngOnInit() {

        //prendo i path delle immagini e il # di floor dal db e li metto in un array
        this.planService.getPlans()
            .subscribe( plans => {
                plans.forEach( (obj) => {
                    this.image.push(obj.imagePath);
                    this.floor.push(obj.floor);
                })
            });

        console.log(this.image);
        console.log(this.floor);
        //this.showSlides(this.slideIndex);

      this.themingService.checkAndChangeTextContrast();
      this.themingService.setCurrentTheme();

    }


     // Next/previous controls
     plusSlides(n) {
         this.showSlides(this.slideIndex += n);
     }

     // Thumbnail image controls
     currentSlide(n) {
         this.showSlides(this.slideIndex = n);
     }

    /**
     * a method to figure out which image
     * should be shown
     * @param n
     */
     showSlides(n){

         let i;
         let dots = document.getElementsByClassName("dot");

         if (n > this.slidesBinding.length) {
             this.slideIndex = 1
         }

         if (n < 1) {
             this.slideIndex =  this.slidesBinding.length
         }

         for (i = 0; i < this.slidesBinding.length; i++) {
             this.slidesBinding[i] = true;
             dots[i].className = dots[i].className.replace(" active", "");
         }

         this.slidesBinding[this.slideIndex-1] = false;
         dots[this.slideIndex-1].className += " active";
     }


}
