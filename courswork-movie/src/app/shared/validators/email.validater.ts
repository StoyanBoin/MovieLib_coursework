import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { required } from "@angular/forms/signals";

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true }; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      return { invalidEmail: true }; 
    }

    return null; 
  };
}