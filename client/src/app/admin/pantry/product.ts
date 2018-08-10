export class Product {
    code: Number;
    name: String;
    category: String;
    quantity: Number;
    unit: Unit;
}

export enum Unit {
  KG = "Kg",
  GR = "grams",
  L = "l",
  PACKAGES = "Packages"
}