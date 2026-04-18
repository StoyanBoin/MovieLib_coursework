import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InputError } from '../../../directives/input-error';
import { Api } from '../../../../core/services/api';

@Component({
  selector: 'app-new-movie',
  imports: [ FormsModule, InputError ],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.css',
})
export class NewMovie {
  @ViewChild('movieForm') movieForm!: NgForm;

  movieName = '';
  imageUrl = '';
  subscribers: '' = '';
  postText = '';
  isLoading = false;
  errorMessage = '';

  private router = inject(Router);
  private apiService = inject(Api);

  onSubmit(): void {
    if (this.movieForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.createMovie({
      movieName: this.movieName,
      imageUrl: this.imageUrl,
      postText: this.postText,
      subscribers: this.subscribers,
    }).subscribe({
      next: (movie) => {
        this.isLoading = false;
        this.router.navigate(['/movies', movie._id]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create movie. Please try again.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
