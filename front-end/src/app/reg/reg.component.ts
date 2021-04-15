import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit, OnDestroy {

  public name: string;
  public login: string;
  public email: string;
  public password: string;

  private _sub: Subscription

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  singUp() {
    if (!this.checkAllFields()) {
      return;
    }

    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }

    this._sub = this._authService.registerUser(user).subscribe((data: any) => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger' });
        this._router.navigate(['/reg']);
        return;
      }

      this._flashMessagesService.show(data.msg, { cssClass: 'alert-success' });
      this._router.navigate(['/auth']);
    })
  }

  checkAllFields(): boolean {
    if (!this.name) {
      this._flashMessagesService.show('Enter your name', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.login) {
      this._flashMessagesService.show('Enter your login', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.email) {
      this._flashMessagesService.show('Enter your email', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.password) {
      this._flashMessagesService.show('Enter your password', { cssClass: 'alert-danger' });
      return false;
    }

    return true;
  }
}
