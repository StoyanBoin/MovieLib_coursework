import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private authService = inject(AuthService);

  user = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
