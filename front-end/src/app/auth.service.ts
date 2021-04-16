import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string | null;
  private _user: any;

  constructor(
    private _http: HttpClient,
    private _jwtHelper: JwtHelperService
  ) { }

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

  createPost(post: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/account/dashboard', post, { headers });
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

  isAuthenticated(): boolean {
    return !this._jwtHelper.isTokenExpired();
  }

  getAllPosts(): Observable<any> {
    return this._http.get('http://localhost:3000');
  }

  getPostById(id: string): Observable<any> {
    return this._http.get(`http://localhost:3000/post/${id}`);
  }

  deletePost(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/post/${id}`);
  }
}
