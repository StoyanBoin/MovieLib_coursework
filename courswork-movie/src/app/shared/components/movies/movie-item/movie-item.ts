import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/movie';
import { DateFormatPipe } from '../../../pipes/date-format-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  imports: [DateFormatPipe, RouterLink],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  @Input({ required: true }) movie!: Movie;
}
