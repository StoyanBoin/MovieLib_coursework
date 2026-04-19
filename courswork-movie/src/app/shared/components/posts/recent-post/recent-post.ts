import { Component, OnInit } from '@angular/core';
import { Api } from '../../../../core/services/api';
import { Post } from '../../../interfaces/post';
import { PostItem } from '../post-item/post-item';

@Component({
  selector: 'app-recent-post',
  imports: [PostItem],
  templateUrl: './recent-post.html',
  styleUrl: './recent-post.css',
})
export class RecentPost implements OnInit {
  posts: Post[] = [];

  constructor(private apiService: Api){}

  ngOnInit(): void{
    this.apiService.getLastestPosts().subscribe((p) => {
      this.posts = p.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
  }
}
