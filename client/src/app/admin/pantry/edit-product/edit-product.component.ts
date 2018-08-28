import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product, Unit} from "../product";

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

    constructor(public dialogRef: MatDialogRef<EditProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Product, public pantryService: PantryService) { }

    formControl = new FormControl('', [Validators.required]);

    units = Object.values(Unit);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
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

    isInvalid(code) {
        return code.length !== 8 &&
            code.length !== 13 &&
            code.length !== 14 &&
            code.length !== 17;
    }

}
