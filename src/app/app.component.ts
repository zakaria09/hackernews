import { Component, OnInit } from '@angular/core';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private articleService: ArticleService
  ) {}

  ngOnInit() {}

  loadNextArticles() {
    this.articleService.fetchTopStories(true);
  }
}
