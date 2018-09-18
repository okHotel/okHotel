import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../service/menu/menu.service';
import {DatePipe} from '@angular/common';
import {CustomerService} from '../service/customer/customer.service';
import {Meal, Reservation} from './reservation';
import {Note} from './Note';
import {MessageService} from '../service/message/message.service';
import {ThemingService} from '../service/theming/theming.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  l = Meal.LUNCH;
  d = Meal.DINNER;
  hl = Meal.HALF_LUNCH;
  hd = Meal.HALF_DINNER;
  people: number[] = [];
  room: number;
  dinnerCardState = false;
  lunchCardState = true;
  note: string;
  isReservationNotValid: boolean = false;
  reservationError: string;

  @ViewChild('inputNote') inputNote: ElementRef;

  constructor(private router: Router,
              public menu: MenuService,
              private datepipe: DatePipe,
              private customerService: CustomerService,
              public messageService: MessageService,
              public themingService: ThemingService) {
    if (this.themingService.isUseBackgroundOn()) {
      document.body.style.backgroundImage = "url('../../assets/images/restaurant.jpg')";
      document.body.style.backgroundRepeat = "repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
    }

  }

  get myStyle() {
    return {
      'width': (this.menu.showLunchVariations || this.menu.showDinnerVariations) ? '40%' : '0',
      'padding-top': (this.menu.showLunchVariations || this.menu.showDinnerVariations) ? '5%' : '0',
      'transition': '0.5s'
    };
  }

  ngOnInit() {
    console.log('isReservationNotValid');
    console.log(this.isReservationNotValid);

    this.menu.menu.otherNotes = [];

    const latest_date: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.menu.setDate(new Date(latest_date));

    this.menu.getDateMenu().subscribe(
      data => {
        this.menu.setMenu(data);
      },
      err => {
        this.messageService.error = err.error.message;
      }
    );

    this.customerService.getLoggedCustomer().subscribe(data => {
      for (let i = 0; i <= data.numberOfPeople; i++) {
        this.people.push(i);
      }
      this.room = data.roomNumber;
    });

    this.themingService.checkAndChangeInputBorders();
  }

  saveReservations() {
    this.menu.saveMenu().subscribe();
    this.messageService.success = "Menu successfully saved";
    this.router.navigateByUrl('');
  }

  addVariations(dish: string, type: Meal) {

    if (this.menu.menu.reservations.filter(r => r.dish === dish && r.type === type).length === 0) {
      this.setReservation(type, dish, 0);
    }

    this.menu.savedRes = this.menu.menu.reservations.filter(r => r.dish === dish && r.type === type).pop();

    switch (type) {
      case this.l: {
        this.menu.showLunchVariations = true;
        break;
      }
      case this.hl: {
        this.menu.showLunchVariations = true;
        break;
      }
      case this.d: {
        this.menu.showDinnerVariations = true;
        break;
      }
      case this.hd: {
        this.menu.showDinnerVariations = true;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  setReservation(selectedType: Meal, selectedDish: string, selectedQuantity: number) {
    let newRes = true;

    this.menu.menu.reservations.forEach(r => {
      if (r.roomNumber === this.room && r.type === selectedType && r.dish === selectedDish) {
        r.quantity = selectedQuantity;
        newRes = false;
      }
    });

    if (newRes) {
      const reservation: Reservation = {
        roomNumber: this.room,
        type: selectedType.toString(),
        quantity: selectedQuantity,
        dish: selectedDish,
        variations: []
      };

      this.menu.menu.reservations.push(reservation);
    }

    if (selectedType == Meal.LUNCH || selectedType == Meal.HALF_LUNCH) {
      this.checkReservation(this.l, this.hl);
    } else if (selectedType == Meal.DINNER || selectedType == Meal.HALF_DINNER) {
      this.checkReservation(this.d, this.hd);
    }

  }

  checkReservation(type1: Meal, type2: Meal) {
    let total = 0;

    console.log('isReservationNotValid1');
    console.log(this.isReservationNotValid);

    this.menu.menu.reservations
      .filter(r => r.roomNumber === this.room)
      .filter(r => r.type === type1 || r.type === type2)
      .forEach(e => total += e.quantity);

    const mul_factor = type1 === Meal.LUNCH ? 2 : 3;

    this.isReservationNotValid = total > (this.people.length - 1) * mul_factor;

    if (this.isReservationNotValid) {
      this.reservationError = this.getErrorMessage();
    } else {
      this.reservationError = '';
    }

    console.log('isReservationNotValid2');
    console.log(this.isReservationNotValid);

    return this.isReservationNotValid;
  }

  checkSave() {
/*
    return this.checkReservation(Meal.LUNCH, Meal.HALF_LUNCH) || this.checkReservation(Meal.DINNER, Meal.HALF_DINNER);
*/
    return !this.isReservationNotValid;
  }

  getErrorMessage() {
/*
    return 'Number of dishes booked too high';
*/
    return 'Choose max 2 dishes for each person for lunch and 3 for dinner';
  }

  getRes(type: Meal, dish: string) {
    let res = 0;
    this.menu.menu.reservations.forEach(r => {
      if (r.roomNumber === this.room && r.type === type && r.dish === dish) {
        res = r.quantity;
      }
    });
    return res;
  }

  addNote() {
    let newNote = true;

    this.menu.menu.otherNotes.forEach(n => {
      if (n.roomNumber === this.room) {
        newNote = false;
        n.text = this.note;
      }
    });

    if (newNote) {
      const note: Note = {
        roomNumber: this.room,
        text: this.note
      };
      this.menu.menu.otherNotes.push(note);
    }
    this.inputNote.nativeElement.value = '';
  }

  getNote() {
    let res = '';
    this.menu.menu.otherNotes.forEach(n => {
      if (n.roomNumber === this.room) {
        res = n.text;
      }
    });
    return res;
  }

  changeDinnerCardState() {
    this.dinnerCardState = !this.dinnerCardState;
  }

  changeLunchCardState() {
    this.lunchCardState = !this.lunchCardState;
  }

}
