import { Component } from '@angular/core';
import { MovieList } from './movie-list/movie-list';
import { RecentPost } from '../posts/recent-post/recent-post';

@Component({
  selector: 'app-movies',
  imports: [MovieList, RecentPost],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}
