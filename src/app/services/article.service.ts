import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = 'https://hacker-news.firebaseio.com/v0/';
  topNineStoriesIds: Array<number>;
  articles: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  fetchTopStoriesIds() {
    return this.http.get(`${this.baseUrl}topstories.json?print=pretty`)
      .subscribe((ids: Array<number>) => {
        const top9Ids = ids.slice(0, 9);
        top9Ids.map(id => {
          this.http.get(`${this.baseUrl}item/${id}.json`)
            .subscribe(articles => {
              this.articles.next(articles);
            });
        })
      });
  }
}
