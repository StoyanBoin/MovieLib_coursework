import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { InputError } from '../../shared/directives/input-error';
import { EmailValidater } from '../../shared/directives/email-validater';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, InputError, EmailValidater],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  @ViewChild('profileForm') profileForm!: NgForm;

  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  user = this.authService.currentUser;

  isEditing = signal(false);
  isLoading = signal(false);

  editUsername = '';
  editEmail = ''
  // editTelephone = '';

  ngOnInit(): void {
    if (!this.user()) {
      this.authService.getProfile().subscribe({
        next: (user) => this.authService.setSession(user),
        error: () => { }
      });
    }
  }

  toggleEdit(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.editUsername = currentUser.username;
      this.editEmail = currentUser.email;
      // this.editTelephone = currentUser.telephone?.replace('+359', '') || '';
    }
    this.isEditing.set(true);
  }

  onCancel(): void {
    this.isEditing.set(false);
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    const updatedData = {
      username: this.editUsername,
      email: this.editEmail,
      // telephone: this.editTelephone ? '+359' + this.editTelephone : undefined,
    }

    this.authService.updateProfile(updatedData).subscribe({
      next: (updatedUser) => {
        this.authService.setSession(updatedUser);
        this.isLoading.set(false);
        this.isEditing.set(false);
        this.notificationService.showSuccess('Profile updated successfully!');
      },
      error: (err) => {
        this.isLoading.set(false);
        this.notificationService.showError('Failed to update profile. Please try again.');
      }
    });

  }
}
