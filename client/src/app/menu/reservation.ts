export class Reservation {
    roomNumber: number;
    type: string;
    dish: string;
    quantity: number;
}

export enum Meal {
    LUNCH = 'lunch',
    DINNER = 'dinner'
}