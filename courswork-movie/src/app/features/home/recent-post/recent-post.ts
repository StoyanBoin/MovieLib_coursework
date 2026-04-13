import { Component, OnInit } from '@angular/core';
import { Api } from '../../../core/services/api';
import { Post } from '../../../shared/interfaces/post';

@Component({
  selector: 'app-recent-post',
  imports: [],
  templateUrl: './recent-post.html',
  styleUrl: './recent-post.css',
})
export class RecentPost implements OnInit{
  posts: Post[] = [];

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.apiService.getLastestPosts().subscribe((p) => {
      this.posts = p;
    })
  }
}
