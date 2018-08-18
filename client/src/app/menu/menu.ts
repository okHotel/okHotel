import {Reservation} from './reservation';
import  {Note} from './Note';

export class  Menu {
    _id: string;
    date: Date;
    lunch_dishes: string[];
    dinner_dishes: string[];

    otherNotes: Note[];

    reservations: Reservation[];


    constructor() {
        this.lunch_dishes = [];
        this.dinner_dishes = [];
        this.reservations = [];
    };


}