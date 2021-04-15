import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string | null;
  private _user: any;

  constructor(private _http: HttpClient) { }

  registerUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/account/reg', user, { headers });
  }

  authUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/account/auth', user, { headers });
  }

  storeUser(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this._token = token;
    this._user = user;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    localStorage.clear();
  }
}
