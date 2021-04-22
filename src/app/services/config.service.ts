import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as Uri from 'urijs';
import { environment } from '../../environments/environment';

export interface Config {
  versionInfo: string;
}

@Injectable()
export class ConfigService {
  private _config: Config;

  constructor(
    @Inject('WINDOW') private window: Window,
    private http: HttpClient
  ) {}

  get(): Observable<Config> {
    var config: Config = { versionInfo: '0.0.1-alfa01' };

    return of(config);
    //return this.http.get<Config>(this.buildApiUrl('api/config'));
  }

  buildApiUrl(path: string): string {
    if (!!environment.apiUrl) {
      return new Uri(environment.apiUrl).path(path).toString();
    }
    return path;
  }

  buildAppUrl(path: string): string {
    return new Uri(this.window.location.origin).path(path).toString();
  }
}
