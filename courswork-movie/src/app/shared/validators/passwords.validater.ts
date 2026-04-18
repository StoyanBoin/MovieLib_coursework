import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const rePassword = control.get('rePassword');
  
    if (password?.value !== rePassword?.value) {
        return { passwordsMismatch: true };
    }

    return null;

}
