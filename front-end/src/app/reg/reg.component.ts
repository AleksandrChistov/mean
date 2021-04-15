import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  public name: string;
  public login: string;
  public email: string;
  public password: string;

  constructor(private _flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  singUp() {
    if (!this.checkAllFields()) {
      return;
    }

    return {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }
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
