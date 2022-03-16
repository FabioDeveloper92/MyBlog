import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TranslateService } from '@ngx-translate/core';
import { TagModel } from '../../../core/model/tag.model';
import { AddPost } from '../../models/add-post.model';
import { MyPostCanBeRelated } from '../../models/my-post-can-be-related';
import { UpdatePost } from '../../models/update-post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, OnChanges {
  @Input() isBusyPublish: boolean;
  @Input() isBusySaveDraft: boolean;
  @Input() draftPost: UpdatePost;
  @Input() tagsBlog: TagModel[];
  @Input() selectPostsCanBeRelated: MyPostCanBeRelated[];

  @Output() publish = new EventEmitter<AddPost>();
  @Output() savedraft = new EventEmitter<AddPost>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '350',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  addPostForm: FormGroup;

  ctrlTitle: FormControl;
  ctrlText: FormControl;
  ctrlImageMain: FormControl;
  ctrlImageThumb: FormControl;
  ctrlTags: FormControl;
  ctrlPostsRelated: FormArray;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService
      .get('NEWPOST.PLACEHOLDER_TEXT')
      .subscribe((text: string) => {
        this.editorConfig.placeholder = text;
      });

    this.ctrlTitle = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30),
    ]);

    this.ctrlText = new FormControl('', [Validators.required]);
    this.ctrlImageMain = new FormControl('', [Validators.required]);
    this.ctrlImageThumb = new FormControl('', [Validators.required]);
    this.ctrlTags = new FormControl(null, [Validators.required]);
    this.ctrlPostsRelated = new FormArray([]);

    if (
      this.selectPostsCanBeRelated &&
      this.selectPostsCanBeRelated.length > 0
    ) {
      for (let pr of this.selectPostsCanBeRelated) {
        var isSelected =
          this.draftPost && this.draftPost.postRelated.includes(pr.id);
        this.ctrlPostsRelated.push(new FormControl(isSelected));
      }
    }

    this.addPostForm = this.fb.group({
      text: this.ctrlText,
      title: this.ctrlTitle,
      imageMain: this.ctrlImageMain,
      imageThumb: this.ctrlImageThumb,
      tags: this.ctrlTags,
      postsRelated: this.ctrlPostsRelated,
    });

    this.addPostForm.markAsUntouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];

        if (change.currentValue) {
          switch (propName) {
            case 'draftPost': {
              this.populateForm(change.currentValue);
            }
          }
        }
      }
    }
  }

  onPublish() {
    let addPost = this.ConvertFormToAddPost();
    addPost.toPublished = true;

    this.publish.emit(addPost);
  }

  onSaveDraft() {
    let addPost = this.ConvertFormToAddPost();
    addPost.toPublished = false;

    this.savedraft.emit(addPost);
  }

  private ConvertFormToAddPost(): AddPost {
    let addPost = new AddPost();
    addPost = { ...addPost, ...this.addPostForm.value };

    let selectedPostRelatedIds = [];
    for (let i = 0; i < this.addPostForm.value.postsRelated.length; i++) {
      if (this.addPostForm.value.postsRelated[i]) {
        selectedPostRelatedIds.push(this.selectPostsCanBeRelated[i].id);
      }
    }
    addPost.postsRelated = selectedPostRelatedIds;
    return addPost;
  }

  private populateForm(post: UpdatePost) {
    this.addPostForm.patchValue({
      title: post.title,
      text: post.text,
      imageMain: post.imageMain,
      imageThumb: post.imageThumb,
      tags: post.tags,
    });

    if (
      this.selectPostsCanBeRelated &&
      this.selectPostsCanBeRelated.length > 0
    ) {
      for (let pr of this.selectPostsCanBeRelated) {
        var isSelected =
          this.draftPost && this.draftPost.postsRelated.includes(pr.id);
        this.ctrlPostsRelated.push(new FormControl(isSelected));
      }
    }

    this.addPostForm.setControl('postsRelated', this.ctrlPostsRelated);
  }
}
