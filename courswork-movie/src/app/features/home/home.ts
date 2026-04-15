import { Component } from '@angular/core';
import { MovieList } from '../../shared/components/movies/movie-list/movie-list';
import { RecentPost } from './recent-post/recent-post';

@Component({
  selector: 'app-home',
  imports: [MovieList, RecentPost],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
