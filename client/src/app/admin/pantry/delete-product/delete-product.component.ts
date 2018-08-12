import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {PantryService} from "../../../service/pantry/pantry.service";

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

    constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, public pantryService: PantryService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.pantryService.deleteProduct(this.data.code);
    }
}