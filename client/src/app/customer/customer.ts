export class  Customer {
    _id: string;
    roomNumber: number;
    bookingName: string;
    bookingSurname: string;
    username: string;
    password: string;
    numberOfPeople: number;
    otherNeeds: string[];

    public static fromJSON(json: any): Customer {
        if (typeof json === 'string') {
            return JSON.parse(json, Customer.reviver);
        } else if (json !== undefined && json !== null) {
            let person = Object.create(Customer.prototype);
            return Object.assign(person, json);
        } else {
            return json;
        }
    }

    public static reviver(key: string, value: any): any {
        return key === '' ? Customer.fromJSON(value) : value;
    }
}
