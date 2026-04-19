import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/movie';

@Component({
  selector: 'app-movie-item',
  imports: [],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  @Input({ required: true }) movie!: Movie;
}
