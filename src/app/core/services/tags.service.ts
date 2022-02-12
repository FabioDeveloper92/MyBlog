import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TagModel } from '../model/tag.model';

@Injectable()
export class TagsService {
  constructor() {}

  list(): Observable<TagModel[]> {
    let tagModels: TagModel[] = [
      new TagModel(0, 'PROGRAMMING'),
      new TagModel(1, 'ANGULAR'),
      new TagModel(2, 'CSHARP'),
      new TagModel(3, 'SQL'),
      new TagModel(4, 'MONGODB'),
    ];

    return of(tagModels);
  }
}
