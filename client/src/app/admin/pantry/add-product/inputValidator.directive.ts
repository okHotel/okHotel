import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive} from '@angular/core';



@Directive({
    selector: '[appInputValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true}]
})
export class InputValidatorDirective implements Validator {

    validate(control: AbstractControl): {} {
        if (control.value.size === 8 ||
            control.value.size === 13 ||
            control.value.size === 4 ||
            control.value.size === 17 ) {
            return null;
        } else {
            return {'WrongBarcodeSize': {value: control.value}};
        }
    }
}
