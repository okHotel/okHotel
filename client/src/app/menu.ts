import {Reservation} from './Reservation';

export class  Menu {
    _id: string;
    date: Date;
    lunch_dishes: string[];
    dinner_dishes: string[];

    otherNotes: {
        roomNumber: number;
        text: string
    };

    Reservations: Reservation[];


    constructor() {
        this.lunch_dishes = [];
        this.dinner_dishes = [];
    };


}