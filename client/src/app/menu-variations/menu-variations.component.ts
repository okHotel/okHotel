import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu-variations',
    templateUrl: './menu-variations.component.html',
    styleUrls: ['./menu-variations.component.css']
})


export class MenuVariationsComponent implements OnInit {

<<<<<<< HEAD

  public title = 'aa';
  public variation = ['Wheat', 'Milk', 'Egg', 'Starwberry', 'Fish'];

  constructor(private router: Router) {}

=======
>>>>>>> master

  public variation = ['Wheat', 'Milk', 'Egg', 'Starwberry', 'Fish'];

<<<<<<< HEAD

=======
  constructor(private router: Router) { }
>>>>>>> master

  ngOnInit() { }

  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

}
