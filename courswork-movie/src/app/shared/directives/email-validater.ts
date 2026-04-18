import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailValidater]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailValidater, multi: true },
  ],
})
export class EmailValidater implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { invalidEmail: true }; 
    }

    return null; 
  }
}
