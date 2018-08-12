export class Product {
    code: number;
    name: string;
    category: string;
    quantity: number;
    unit: Unit;
}

export enum Unit {
  KG = "Kg",
  GR = "grams",
  L = "l",
  PACKAGES = "Packages"
}