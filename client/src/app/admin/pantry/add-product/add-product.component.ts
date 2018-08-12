import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product} from "../product";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
    constructor(public dialogRef: MatDialogRef<AddProductComponent>,
                @Inject(MAT_DIALOG_DATA) public product: Product,
                public pantryService: PantryService) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
/*
            this.formControl.hasError('email') ? 'Not a valid email' :
*/
                '';
    }

    submit() {
        // emppty stuff
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmAdd(): void {
        this.pantryService.addProduct(this.product);
    }
}