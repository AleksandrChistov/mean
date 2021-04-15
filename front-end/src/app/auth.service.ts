import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  registerUser(user: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this._http.post('http://localhost:3000/account/reg', user, { headers });
  }
}
