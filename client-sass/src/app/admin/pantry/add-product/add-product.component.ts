import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PantryService} from '../../../service/pantry/pantry.service';
import {Product, Unit} from '../product';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

    product: Product = new Product();
    isCodeReadOnly: Boolean = false;
    units = Object.values(Unit);

    constructor(public dialogRef: MatDialogRef<AddProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                public pantryService: PantryService) {}

    formControl = new FormControl('', [
        Validators.required
    ]);

    ngOnInit() {
        if (this.product.code !== undefined) {
            this.product.code = this.data.code;
            this.isCodeReadOnly = true;
        } else {
            this.product.code = '';
        }
    }

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

    isCodeInvalid(code) {
       return code.length !== 8 &&
           code.length !== 13 &&
           code.length !== 14 &&
           code.length !== 17;
    }
}
