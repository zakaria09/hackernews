import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
  }

  showArticleComments(article) {
    const commentIds: Array<number> = article.kids;
    this.articleService.fetchArticleComments(commentIds);
  }
}
