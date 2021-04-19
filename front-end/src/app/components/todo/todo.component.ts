import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { AddTodoKeys } from 'src/app/store/actions/todo-keys.action';
import * as TodoActions from '../../store/actions/todo.actions';
import { ITodoStateModel, TodoState } from '../../store/state/todo.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  public title = 'ngxs-todo-app';
  public addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    keys: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store,
    private router: Router
  ) { }

  @Select(TodoState) todoList$: Observable<ITodoStateModel>;


  onSubmit(formValue: any) {
    const arrKeys = formValue.keys.split(',');
    this.store.dispatch(new AddTodoKeys(arrKeys, formValue.title));

    this.store.dispatch(new TodoActions.AddTodo(formValue.title))
      .subscribe(() => this.addForm.reset());

    this.router.navigate(['/lazy']);
  }

  markDone(id: string, is_done: boolean) {
    this.store.dispatch(new TodoActions.markDone(id, is_done));
  }
}
