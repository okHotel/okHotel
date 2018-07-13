import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu-variations',
    templateUrl: './menu-variations.component.html',
    styleUrls: ['./menu-variations.component.css']
})


export class MenuVariationsComponent implements OnInit {

<<<<<<< Updated upstream
  public title = 'aa';
  public variation = ['Wheat', 'Milk', 'Egg', 'Starwberry', 'Fish'];

  constructor() {}


  ngOnInit() { }

=======
  constructor(private router: Router) { }
>>>>>>> Stashed changes


  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

}
