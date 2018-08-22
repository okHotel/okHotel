export class Reservation {
    roomNumber: number;
    type: string;
    dish: string;
    quantity: number;
}

export enum Meal {
    LUNCH = 'lunch',
    DINNER = 'dinner',
    HALF_LUNCH = "halfLunch",
    HALF_DINNER = "halfDinner",
    INTOLLERANCE = "intollerance",
    ALLERGY = "allergy"
}