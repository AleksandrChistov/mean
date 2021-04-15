import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logoutUser(): void {
    this._authService.logout();
    this._flashMessagesService.show('You are logged out', { cssClass: 'alert-success' });
    this._router.navigate(['/auth']);
  }

  get isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  }
}
