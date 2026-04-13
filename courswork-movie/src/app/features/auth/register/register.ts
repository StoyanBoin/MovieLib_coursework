import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';
import { User, UserWithPassword } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  username = '';
  email = ''
  password = '';
  rePassword = '';

  onRegister(): void {
    if (!this.email || !this.password || !this.username) {
      alert('Please fill in all fields');
      return;
    }
    if (this.password !== this.rePassword) {
      alert('Passwords do not match');
      return;
    }
    const newUser: UserWithPassword = {
      _id: '', 
      username: this.username,
      email: this.email,
      password: this.password,
    };
    
    const sessionUser = this.userService.register(newUser);
    this.authService.setSession(sessionUser);
    this.router.navigate(['/']);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 12);
  }
}