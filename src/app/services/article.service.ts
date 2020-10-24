import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly baseUrl = 'https://hacker-news.firebaseio.com/v0/';
  topNineStoriesIds: Array<number>;
  articles: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  fetchTopStories(nextNineArticles?: boolean) {
    return this.http.get(`${this.baseUrl}topstories.json?print=pretty`)
      .pipe(
        map((ids: Array<number>) => {
          if (nextNineArticles) {
            const nextTop9Ids = ids.slice(0, 18);
            return nextTop9Ids;
          }
          const top9Ids = ids.slice(0, 9);
          return top9Ids;
        })
      )
      .subscribe((ids: Array<number>) => {
        ids.map(id => {
          this.http.get(`${this.baseUrl}item/${id}.json`)
            .subscribe(articles => {
              this.articles.next(articles);
            });
        })
      });
  }

  fetchArticleComments(ids: Array<number>) {
    ids.map(commentId => {
      this.http.get(`${this.baseUrl}item/${commentId}.json?print=pretty`)
        .subscribe((response: any) => {
          const { by, parent, text, time, type } = response;
          console.log({ by, parent, text, time, type })
        });
    });
  }
}
