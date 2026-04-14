import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login { 
  private authService = inject(AuthService);
  private router = inject(Router);
  
  email = '';
  password = '';

  onLogin(): void {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password');
    }
  }
}
