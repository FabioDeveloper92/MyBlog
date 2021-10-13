import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, of } from 'rxjs';
import { UserInfo } from '../model/user-info.model';
import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { GoogleLoginProvider } from 'angularx-social-login';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private jwtService: JwtService,
    private socialAuthService: SocialAuthService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      debugger;
    });

  }

  getUserInfo(token: string): Observable<UserInfo> {
    this.getToken();
    debugger;
    return this.http.get<UserInfo>(
      this.configService.buildApiUrl('api/user/' + token)
    );
  }

  saveUserInfo(userInfo: UserInfo): Observable<string> {
    return this.http.post<string>(
      this.configService.buildApiUrl('api/user'),
      userInfo
    );
  }

  logout() {
    // this.socialAuthService.signOut();
    // this.jwtService.destroyUser();
  }
}
