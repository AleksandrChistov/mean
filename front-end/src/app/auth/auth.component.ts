import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public login: string;
  public password: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  singIn() {
    if (!this.checkAllFields()) {
      return;
    }

    const user = {
      login: this.login,
      password: this.password,
    }

    this._authService.authUser(user).subscribe((data: any) => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger' });
        return;
      }

      this._flashMessagesService.show("You have successfully logged in!", { cssClass: 'alert-success' });
      this._router.navigate(['/dashboard']);
      this._authService.storeUser(data.token, data.user);
    })
  }

  checkAllFields(): boolean {
    if (!this.login) {
      this._flashMessagesService.show('Enter your login', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.password) {
      this._flashMessagesService.show('Enter your password', { cssClass: 'alert-danger' });
      return false;
    }

    return true;
  }

}
