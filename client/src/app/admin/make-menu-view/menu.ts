export class  Menu {
    _id: string;
    date: Date;
    lunch_dishes: string[];
    dinner_dishes: string[];
    otherNotes: {
        roomNUmber: number;
        text: string
    };

    Reservations: {
        roomNUmber: number;
        lunch: number[];
        lunchVariation: number[];

        dinner: number[];
        dinnerVariations: number[]
    }


    constructor();
    constructor(date?: Date, lc?: string[], dn?: string[]){
        this.date = date;
        this.lunch_dishes = lc;
        this.dinner_dishes = dn;
    }


}