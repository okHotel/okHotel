import {Component, OnChanges, OnInit} from '@angular/core';
import {Menu} from '../../menu/menu';
import {MenuService} from '../../service/menu/menu.service';
import {Router} from '@angular/router';
import {ThemingService} from '../../service/theming/theming.service';
import {MessageService} from '../../service/message/message.service';
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
    public themingService: ThemingService,
    public messageService: MessageService) {

    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('../../../assets/images/restaurant.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }
  }

  ngOnInit() {
    this.themingService.checkAndChangeInputBorders();
    this.themingService.checkAndChangeTextContrast();
    this.themingService.setCurrentTheme();
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
          console.log('DB message');
          this.isLoadedDate = false;
          this.menu.setMenu(new Menu());
          this.menu.setDate(this.date);
        });
  }

  saveMenu() {
    if (this.checkDate()) {
      this.menu.saveMenu().subscribe( data =>{
        console.log('Saved menu '+ data);
        this.messageService.success = 'Menu successfully added';
      });
      this.router.navigateByUrl('/admin-profile');
    }

    this.goToRestaurant();

  }

  deleteMenu() {
    if (this.checkDate()) {
      this.menu.deleteMenu().subscribe( data => {
        console.log('Deleted menu '+ data)});
      this.messageService.success = 'Menu successfully deleted';
    }
    this.menu.setMenu(new Menu());
    this.menu.setDate(this.date);

    this.goToRestaurant();
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  goToRestaurant() {
    this.router.navigateByUrl('/admin/restaurant');
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
