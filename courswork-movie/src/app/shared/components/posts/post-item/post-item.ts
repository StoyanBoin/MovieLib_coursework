import { Component, Input } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { DateAgoPipe } from '../../../pipes/date-ago-pipe';

@Component({
  selector: 'app-post-item',
  imports: [DateAgoPipe],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css',
})
export class PostItem  {
  @Input({ required: true }) post!: Post;
}
