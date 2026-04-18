import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputError } from '../../../shared/directives/input-error';
import { emailValidator } from '../../../shared/validators/email.validater';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, InputError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login { 
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.authService.setSession(user);
        this.notificationService.showSuccess('Login successful!');
        this.router.navigate(['/']);
        
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}
