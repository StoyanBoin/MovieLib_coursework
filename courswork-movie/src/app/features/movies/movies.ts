import { Component } from '@angular/core';
import { MovieList } from '../home/movie-list/movie-list';

@Component({
  selector: 'app-movies',
  imports: [MovieList],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}
