import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent implements OnInit {
  @Output() addComment = new EventEmitter<Comment>();

  addCommentForm: FormGroup;

  ctrlName: FormControl;
  ctrlEmail: FormControl;
  ctrlComment: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ctrlName = new FormControl('', [Validators.required]);
    this.ctrlEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.ctrlComment = new FormControl('', [Validators.required]);

    this.addCommentForm = this.fb.group({
      name: this.ctrlName,
      email: this.ctrlEmail,
      comment: this.ctrlComment,
    });

    this.addCommentForm.markAsUntouched();
  }

  onAddComment() {
    let comment = new Comment();
    comment = { ...comment, ...this.addCommentForm.value };

    this.addComment.emit(comment);
  }
}
