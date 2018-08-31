export class Reservation {
  roomNumber: number;
  type: string;
  dish: string;
  quantity: number;
  variations: Variation[];
}

export enum Meal {
  LUNCH = 'lunch',
  DINNER = 'dinner',
  HALF_LUNCH = 'halfLunch',
  HALF_DINNER = 'halfDinner'
}

export enum VariationType {
  INTOLLERANCE = 'intollerance',
  ALLERGY = 'allergy'
}

export class Variation {
  type: VariationType;
  name: string;
  quantity: number;
}
