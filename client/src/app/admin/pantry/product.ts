export class Product {
    _id: string;
    code: string;
    name: string;
    category: string;
    quantity: number;
    unit: Unit;
}

export enum Unit {
    BOXES = 'boxes',
    GR = 'grams',
    L = 'l',
    KG = 'Kg',
    PACKS = 'paks',
    PACKETS = 'packets'
}