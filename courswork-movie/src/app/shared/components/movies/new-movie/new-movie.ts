import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InputError } from '../../../directives/input-error';
import { Api } from '../../../../core/services/api';
import { NotificationService } from '../../../../core/services/notification';

@Component({
  selector: 'app-new-movie',
  imports: [FormsModule, InputError],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.css',
})
export class NewMovie {
  @ViewChild('movieForm') movieForm!: NgForm;

  themeName = '';
  // imageUrl = '';
  // year = '';
  postText = '';
  subscribers = '';
  isLoading = false;

  private router = inject(Router);
  private apiService = inject(Api);
  private notificationService = inject(NotificationService);

  onSubmit(): void {
    if (this.movieForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.apiService.createMovie({
      themeName: this.themeName,
      subscribers: this.subscribers,
    }).subscribe({
      next: (movie) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Movie created successfully!');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showError('Failed to create movie. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
