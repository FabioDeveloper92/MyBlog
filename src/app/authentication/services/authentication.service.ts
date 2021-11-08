import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddUserInfo } from '../model/add-user-info.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { UserInfo } from '../model/user-info.model';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getUserInfo(token: string): Observable<UserInfo> {
    if (!token) return of(null);

    return this.http.get<UserInfo>(
      this.configService.buildApiUrl(`api/user/${token}`)
    );
  }

  saveUserInfo(userInfo: AddUserInfo): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/user'),
      userInfo,
      { responseType: 'text' as 'json' }
    );
  }

  saveUserInfoFromGoogle(userInfo: AddUserInfo): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/usergoogle'),
      userInfo,
      { responseType: 'text' as 'json' }
    );
  }

  signup(userInfo: AddUserInfo): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/userjwt'),
      userInfo,
      { responseType: 'text' as 'json' }
    );
  }

  logout(token: string): Observable<void> {
    return this.http.delete<void>(this.configService.buildApiUrl('api/user'));
  }
}
