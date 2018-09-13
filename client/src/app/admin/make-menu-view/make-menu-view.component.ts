import {Component, OnChanges, OnInit} from '@angular/core';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Router} from '@angular/router';
import {ThemingService} from '../../service/theming/theming.service';
@Component({
  selector: 'app-make-menu-view',
  templateUrl: './make-menu-view.component.html',
  styleUrls: ['./make-menu-view.component.scss']
})
export class MakeMenuViewComponent implements OnInit {

  date: Date = new Date();
  isDateWrong = false;
  isLoadedDate = false;

  constructor(
    public menu: MenuService,
    private router: Router,
    public themingService: ThemingService) {

    document.body.style.backgroundImage = "url('../../../assets/images/restaurant.jpg')";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";

  }

  ngOnInit() {
    this.themingService.checkAndChangeInputBorders();
  }

  setDateMenu(event: any) {
    console.log(event.target.value);
    console.log(this.date);

    this.menu.setDate(this.date);
    this.serachDateMenu();
  }

  serachDateMenu() {
    return this.menu.getDateMenu()
      .subscribe(
        data => {

          console.log('DB OK');

          this.menu.setMenu(data);
          this.isLoadedDate = true;
        },

        error => {
          console.log('DB error');
          this.isLoadedDate = false;
          this.menu.setMenu(new Menu());
          this.menu.setDate(this.date);
        });
  }

  saveMenu() {
    if (this.checkDate()) {
      this.menu.saveMenu().subscribe( data =>{ console.log('Saved menu '+ data)});
      this.router.navigateByUrl('/admin-profile');
    }

  }

  deleteMenu() {
    if (this.checkDate()) {
      this.menu.deleteMenu().subscribe( data => { console.log('Deleted menu '+ data)});
    }
    this.menu.setMenu(new Menu());
    this.menu.setDate(this.date);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  checkDate() {
    return true;
    //TODO filter some date that you don't want to use i.e. past dates
    /*if( this.isLoadedDate || this.date >= new Date()){
        return true;
    }else {
        this.isDateWrong = true;
        return false;
    }*/
  }
}
