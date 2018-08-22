import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {PantryService} from "../../../service/pantry/pantry.service";
import {Product} from "../product";

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
    isDeleteSelected: boolean = false;

    constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Product, public pantryService: PantryService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        if (this.isDeleteSelected) {
            this.pantryService.deleteProduct(this.data._id);
        } else {
            this.pantryService.updateQuantityTo(0, this.data);
        }
    }

}
