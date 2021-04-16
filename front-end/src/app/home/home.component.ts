import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from '../auth.service';

interface Post {
  category: string;
  title: string;
  photo: string;
  text: string;
  author: string;
  date: string;
  _id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public posts: Post[];
  public category: string;
  private _sub: Subscription

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._sub = this._authService.getAllPosts().pipe(
      catchError((error: any) => of(error))
    ).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  setCategory(name: string): void {
    this.category = name;
  }
}
