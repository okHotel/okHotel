import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product} from "../product";

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

    constructor(public dialogRef: MatDialogRef<EditProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Product, public pantryService: PantryService) { }

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

    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        console.log(this.data);
        this.pantryService.updateProduct(this.data);
    }


}