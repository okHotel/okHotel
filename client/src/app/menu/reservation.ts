export class Reservation {
    roomNumber: number;
    type: Meal;
    dish: string;
    quantity: number;
}

export enum Meal {
    LUNCH = 'lunch',
    DINNER = 'dinner'
}