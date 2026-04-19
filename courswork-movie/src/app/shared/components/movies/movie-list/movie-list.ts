import { Component, OnInit } from '@angular/core';
import { Api } from '../../../../core/services/api';
import { Movie } from '../../../interfaces/movie';
import { MovieItem } from '../movie-item/movie-item';


@Component({
  selector: 'app-movie-list',
  imports: [MovieItem],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movies: Movie[] = [];

  constructor(private apiService: Api){}

  ngOnInit(): void{
    this.apiService.getMovies().subscribe((m) => {
      this.movies = m.sort(
        (a, b) => b.subscribers.length - a.subscribers.length
      );
    })
  }
}
