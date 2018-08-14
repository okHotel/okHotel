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

export class AddProductComponent implements OnInit {

    product: Product = new Product();
    isCodeReadOnly: boolean = false;

    constructor(public dialogRef: MatDialogRef<AddProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                public pantryService: PantryService) {}

    formControl = new FormControl('', [
        Validators.required
    ]);

    ngOnInit() {
        console.log('product: ');
        console.log(this.data.code)
        this.product.code = this.data.code;
        if (this.product.code != undefined) {
            this.isCodeReadOnly = true;
        }
        console.log(this.isCodeReadOnly)
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
}