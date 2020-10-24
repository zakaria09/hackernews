import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm: FormGroup;
  isSubmitted = false;

  get articleIds(): Array<number> {
    return this.aticleService.articleIds;
  }

  get hasValidationError(): boolean {
    return this.commentForm.touched && this.commentForm.invalid
  }

  constructor(
    private aticleService: ArticleService
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      by: new FormControl('', Validators.required),
      parent: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    })
  }

  saveComment() {
    const { by, parent, text } = this.commentForm.value;
    const comment = { by, parent, text, time: new Date().getTime(), type: 'comment' };
    this.isSubmitted = true;
    console.log(comment);
  }
}
