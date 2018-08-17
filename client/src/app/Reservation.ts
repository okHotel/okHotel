export class Reservation {
    roomNumber: number;
    lunch: number[];
    lunchVariation: number[];

    dinner: number[];
    dinnerVariations: number[];

    constructor(room: number) {
        this.roomNumber = room;
        this.lunch = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.dinner = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
}