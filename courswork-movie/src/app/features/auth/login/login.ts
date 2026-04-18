import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputError } from '../../../shared/directives/input-error';
import { emailValidator } from '../../../shared/validators/email.validater';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, InputError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login { 
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;
  errMessage = '';

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errMessage = '';

    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.authService.setSession(user);
        this.router.navigate(['/']);
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.errMessage = 'Invalid email or password';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
