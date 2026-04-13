import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../shared/interfaces/post';
import { Movie } from '../../shared/interfaces/movie';


@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:3000/api';

  constructor (private http: HttpClient) {}

  getMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/themes`)
  }
  getLastestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?limit=5`)
  }
}
