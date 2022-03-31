import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isBusyAddComment: boolean;
  @Output() addComment = new EventEmitter<string>();

  addCommentForm: FormGroup;

  ctrlComment: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ctrlComment = new FormControl('', [Validators.required]);

    this.addCommentForm = this.fb.group({
      comment: this.ctrlComment,
    });

    this.addCommentForm.markAsUntouched();
  }

  onAddComment() {
    this.addComment.emit(this.addCommentForm.value.comment);
  }
}
