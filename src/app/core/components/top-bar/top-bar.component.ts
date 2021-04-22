import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetupLanguageAction } from '../../../reducers/language/language.actions';
import { AppState } from '../../../app.state';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
}
