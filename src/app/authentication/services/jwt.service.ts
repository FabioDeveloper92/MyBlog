import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  private static TOKEN_KEY = 'user';

  constructor() {}

  saveUser(token: string) {
    localStorage.setItem(JwtService.TOKEN_KEY, JSON.stringify(token));
  }

  destroyUser() {
    localStorage.removeItem(JwtService.TOKEN_KEY);
  }

  getToken(): string {
    return localStorage.getItem(JwtService.TOKEN_KEY);
  }
}
