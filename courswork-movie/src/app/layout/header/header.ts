import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;
  notification = this.notificationService.notification;
  user = this.authService.currentUser;

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.notificationService.showSuccess('Logged out successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.authService.clearSession();
        this.router.navigate(['/']);
      }
    });
  }

}
