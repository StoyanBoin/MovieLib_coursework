import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../../../core/services/api';
import { AuthService } from '../../../../core/services/auth';
import { Movie } from '../../../interfaces/movie';
import { Post } from '../../../interfaces/post';
import { DateAgoPipe } from '../../../pipes/date-ago-pipe';

@Component({
  selector: 'app-movie-content',
  imports: [FormsModule, DateAgoPipe],
  templateUrl: './movie-content.html',
  styleUrl: './movie-content.css',
})
export class MovieContent implements OnInit {
  private route = inject(ActivatedRoute)
  private apiService = inject(Api)
  private autService = inject(AuthService)


  movie: Movie | null = null;
  posts: Post[] = [];
  commentText = "";
  themeId = "";

  currentUser = computed(() => this.autService.currentUser()?.username ?? 'Unknow')


  ngOnInit(): void {
    this.themeId = this.route.snapshot.params['themeId']
    this.loadMovieData();
  }

  loadMovieData(): void {
    this.apiService.getMovies().subscribe((movies) => {
      this.movie = movies.find((m) => m._id == this.themeId) || null;
    })

    this.apiService.getLastestPosts().subscribe((data) => {
      this.posts = data.filter((p: any) => p.themeId?._id === this.themeId);
    })
  }
  
  onPostComment(): void {
    console.log("Posting comment", this.commentText);
    this.commentText = "";
  }

}
