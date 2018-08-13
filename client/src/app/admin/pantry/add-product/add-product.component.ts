import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product} from "../product";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {

    product: Product = new Product();
    isCodeReadOnly: boolean = false;

    constructor(public dialogRef: MatDialogRef<AddProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                public pantryService: PantryService) {
        console.log('product: ');
        this.product.code = data.code;
        if (this.product.code != 0) {
            this.isCodeReadOnly = true;
        }
        console.log(this.isCodeReadOnly)
    }

    formControl = new FormControl('', [
        Validators.required
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    submit() {
        // emppty stuff
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    public onSave(): void {
        this.pantryService.addProduct(this.product);
    }
}