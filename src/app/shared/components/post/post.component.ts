import {Component, Input, OnInit} from '@angular/core';
import {MediaPostType} from '../../../types/media-post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() post: MediaPostType = {
    kinopoiskId: 0,
    imageUrl: '',
    title: '',
    description: '',
    url: '',
    publishedAt: ''
  };
  constructor() {
  }

  ngOnInit() {

  }
}
