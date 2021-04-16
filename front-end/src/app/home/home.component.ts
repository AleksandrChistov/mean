import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

interface Post {
  category: string;
  title: string;
  photo: string;
  text: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts: Post[];

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.getAllPosts().pipe(
      catchError((error: any) => of(error))
    ).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
