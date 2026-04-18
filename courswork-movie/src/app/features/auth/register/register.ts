import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { emailValidator } from '../../../shared/validators/email.validater';
import { passwordsValidator } from '../../../shared/validators/passwords.validater';



@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required, Validators.minLength(4)],
    email: ['', Validators.required, emailValidator()],
    telephone: [''],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    }, { validators: passwordsValidator})
  });

  isLoading = false;
  errMessage = '';

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errMessage = '';
    
    const { username, email, telephone, passwords } = this.registerForm.value;

    const userData = {
      username,
      email,
      telephone: telephone? '+359' + telephone : undefined,
      password: passwords.password,
    };

    this.authService.register(userData).subscribe({
      next: (user) => {
        this.authService.setSession(user);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}