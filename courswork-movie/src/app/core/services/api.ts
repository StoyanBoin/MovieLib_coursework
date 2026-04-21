import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, Post, UpdatePost } from '../../shared/interfaces/post';
import { CreateMovie, Movie } from '../../shared/interfaces/movie';


@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/themes`)
  }

  getMovie(themeId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/themes/${themeId}`)
  }

  createMovie(movieData: CreateMovie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/themes`, movieData, { withCredentials: true })
  }

  createPost(themeId: string, postData: CreatePost): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/themes/${themeId}`, postData, { withCredentials: true })
  }

    editPost(themeId: string, postId: string, postData: UpdatePost): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/themes/${themeId}/posts/${postId}`, postData, { withCredentials: true });
  }

  deletePost(themeId: string, postId: string): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/themes/${themeId}/posts/${postId}`, { withCredentials: true });
  }

  getLastestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?limit=5`)
  }

  subscribeToMovie(themeId: string): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/themes/${themeId}`, {}, { withCredentials: true })
  }

}
