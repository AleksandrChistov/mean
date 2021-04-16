import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  public post$: Observable<any>;
  public login: string;

  private _sub: Subscription

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user') as string).login;
    }

    this.post$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return this._authService.getPostById(params['id']);
      })
    );
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  deletePost(id: string): void {
    this._sub = this._authService.deletePost(id).pipe(
      catchError((error: any) => of(error))
    ).subscribe((data: any) => {
      if (!data.success) {
        this._flashMessagesService.show('Post not deleted!', { cssClass: 'alert-danger' });
        return;
      }

      this._flashMessagesService.show('Post deleted!', { cssClass: 'alert-success' });
      this._router.navigate(['/']);
    })
  }
}
