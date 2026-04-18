import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { InputError } from '../../shared/directives/input-error';
import { EmailValidater } from '../../shared/directives/email-validater';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, InputError, EmailValidater],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  @ViewChild('profileForm') profileForm!: NgForm;

  private authService = inject(AuthService);

  user = this.authService.currentUser;

  isEditing = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  editUsername = '';
  editEmail = ''
  editTelephone = '';

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
      this.editTelephone = currentUser.telephone?.replace('+359', '') || '';
    }
    this.errorMessage.set('');
    this.isEditing.set(true);
  }

  onCancel(): void {
    this.errorMessage.set('');
    this.isEditing.set(false);
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const updatedData = {
      username: this.editUsername,
      email: this.editEmail,
      telephone: this.editTelephone ? '+359' + this.editTelephone : undefined,
    }

    this.authService.updateProfile(updatedData).subscribe({
      next: (updatedUser) => {
        this.authService.setSession(updatedUser);
        this.isLoading.set(false);
        this.isEditing.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to update profile. Please try again.');
      }
    });

  }
}
