import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { AddUserInfo } from '../model/add-user-info.model';
import { UserInfo } from '../model/user-info.model';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.configService.buildApiUrl(`api/user`));
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

  logout(): Observable<void> {
    return this.http.delete<void>(this.configService.buildApiUrl('api/user'));
  }
}
