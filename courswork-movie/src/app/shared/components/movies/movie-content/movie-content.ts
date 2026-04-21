import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../../../core/services/api';
import { AuthService } from '../../../../core/services/auth';
import { Movie } from '../../../interfaces/movie';
import { Post } from '../../../interfaces/post';
import { DateAgoPipe } from '../../../pipes/date-ago-pipe';
import { DateFormatPipe } from '../../../pipes/date-format-pipe';
import { NotificationService } from '../../../../core/services/notification';

@Component({
  selector: 'app-movie-content',
  imports: [FormsModule, DateAgoPipe, DateFormatPipe],
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
  editedPostId: string | null = null;
  editedPostText = "";

  currentUser = computed(() => this.autService.currentUser()?.username ?? 'Unknow')
  currentUserId = computed(() => this.autService.currentUser()?._id ?? '')
  private notificationService = inject(NotificationService);
  user = this.autService.currentUser;

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
    const postText = this.commentText.trim();

    if (!postText || !this.themeId) {
      return;
    }

    this.apiService.createPost(this.themeId, { postText }).subscribe({
      next: () => {
        this.commentText = "";
        this.notificationService.showSuccess('Post successfully!');
        this.loadMovieData();
      },
      error: (err) => {
        console.error('Failed to create post', err);
        this.notificationService.showError('Failed to post Please try again.');
      }
    });
  }
  canManagePost(post: Post): boolean {
    const postAuthorId = post.userId?._id;
    const loggedInUserId = this.currentUserId();

    if (!postAuthorId || !loggedInUserId) {
      return false;
    }

    return postAuthorId === loggedInUserId;
  }

  onStartEdit(post: Post): void {
    this.editedPostId = post._id;
    this.editedPostText = post.text;
    this.notificationService.showSuccess('Edit post successfully!');
  }

  onCancelEdit(): void {
    this.editedPostId = null;
    this.editedPostText = '';
  }

  onSaveEdit(postId: string): void {
    const postText = this.editedPostText.trim();

    if (!postText || !this.themeId) {
      return;
    }

    this.apiService.editPost(this.themeId, postId, { postText }).subscribe({
      next: () => {
        this.onCancelEdit();
        this.loadMovieData();
      },
      error: (err) => {
        console.error('Failed to edit post', err);
      }
    });
  }

  onDeletePost(postId: string): void {
    if (!this.themeId) {
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this post?');

    if (!isConfirmed) {
      return;
    }

    this.apiService.deletePost(this.themeId, postId).subscribe({
      next: () => {
        if (this.editedPostId === postId) {
          this.onCancelEdit();
        }

        this.loadMovieData();
      },
      error: (err) => {
        console.error('Failed to delete post', err);
      }
    });
  }
}
