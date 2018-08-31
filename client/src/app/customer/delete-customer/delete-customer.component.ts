import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {CustomerService} from "../../service/customer/customer.service";
import {Customer} from "../customer";

@Component({
    selector: 'app-delete-customer',
    templateUrl: './delete-customer.component.html',
    styleUrls: ['./delete-customer.component.sass']
})
export class DeleteCustomerComponent {

    constructor(public dialogRef: MatDialogRef<DeleteCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Customer, public customerService: CustomerService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
      console.log(this.data._id);

      this.customerService.deleteCustomer(this.data._id)
        .subscribe(result => console.log(result), error => console.log(error));
    }

}
