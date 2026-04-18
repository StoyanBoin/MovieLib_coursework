import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-new-movie',
  imports: [ FormsModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.css',
})
export class NewMovie {
  movieName = '';
  subscribers = '';
  imageUrl = '';

  private router = inject(Router);

  onSubmit(): void {
    console.log('New Movie:', this.movieName, this.subscribers, this.imageUrl);
    this.router.navigate(['/movies']);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
