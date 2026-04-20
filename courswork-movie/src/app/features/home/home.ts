import { Component } from '@angular/core';
import { MovieList } from '../../shared/components/movies/movie-list/movie-list';
import { RecentPost } from '../../shared/components/posts/recent-post/recent-post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
