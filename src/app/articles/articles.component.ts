import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles = [];

  constructor(
    private aticleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.aticleService.fetchTopStories();
    this.aticleService.articles
      .subscribe(response => {
        if (response) {
          this.articles.push(response);
        }
      });
  }

}
