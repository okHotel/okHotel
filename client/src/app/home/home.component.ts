import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    slideIndex = 1;
    slidesBinding = [false, true, true];

    ngOnInit() {
        this.showSlides(this.slideIndex);
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
