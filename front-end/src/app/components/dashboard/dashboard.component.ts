import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../auth.service';
import { Store } from '@ngxs/store';
import { User } from '../../store/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public category: string = 'world';
  public title: string;
  public photo: string;
  public text: string;

  public users$: Observable<User[]>;

  private _sub: Subscription;


  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store
  ) {
    this.users$ = this._store.select(state => {
      console.log(state);
      return state.users.users;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  createPost() {
    if (!this.checkAllFields()) {
      return;
    }

    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem('user') as string).login,
      date: new Date()
    }

    this._sub = this._authService.createPost(post).pipe(
      catchError((error: any) => of(error))
    ).subscribe((data: any) => {
      if (!data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger' });
        return;
      }

      this._flashMessagesService.show(data.msg, { cssClass: 'alert-success' });
      this._router.navigate(['/']);
    })
  }

  checkAllFields(): boolean {
    if (!this.title) {
      this._flashMessagesService.show('Enter title', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.photo) {
      this._flashMessagesService.show('Insert a photo', { cssClass: 'alert-danger' });
      return false;
    }
    if (!this.text) {
      this._flashMessagesService.show('Enter text', { cssClass: 'alert-danger' });
      return false;
    }

    return true;
  }
}
