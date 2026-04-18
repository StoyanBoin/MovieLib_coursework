import { Component, OnInit } from '@angular/core';
import { Api } from '../../../../core/services/api';
import { Movie } from '../../../interfaces/movie';


@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movie: Movie[] = [];

  constructor(private apiService: Api){}

  ngOnInit(): void{
    this.apiService.getMovies().subscribe((m) => {
      this.movie = m.sort(
        (a, b) => b.subscribers.length - a.subscribers.length
      )
    })
  }
}
