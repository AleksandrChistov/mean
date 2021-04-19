import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import * as TodoActions from '../actions/todo.actions';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { TodoKeysState } from "./todo-keys.state";

export interface ITodo {
    id: string;
    title: string;
    is_done: boolean;
}
export interface ITodoStateModel {
    todoList: ITodo[];
}

@State<ITodoStateModel>({
    name: 'todoList',
    defaults: {
        todoList: [],
    },
    children: [TodoKeysState]
})
@Injectable()
export class TodoState implements NgxsOnInit {
    ngxsOnInit(ctx: StateContext<ITodoStateModel>) {
        ctx.dispatch(new TodoActions.FetchAllTodos());
    }

    @Action(TodoActions.markDone)
    markDone(
        ctx: StateContext<ITodoStateModel>,
        { id, is_done }: TodoActions.markDone
    ) {
        ctx.setState(
            patch({
                todoList: updateItem<ITodo>(
                    (item: any) => item.id === id,
                    patch({ is_done: !is_done })
                )
            })
        );
    }

    @Action(TodoActions.AddTodo)
    addTodo(
        { getState, patchState }: StateContext<ITodoStateModel>,
        { payload }: TodoActions.AddTodo,
    ) {
        const state = getState();
        patchState({
            todoList: [
                ...state.todoList,
                {
                    title: payload,
                    id: Math.random().toString(36).substring(7),
                    is_done: false
                }
            ]
        });

        // ctx.setState(
        //     patch({
        //         todoList: append([
        //             {
        //                 title: payload,
        //                 id: Math.random().toString(36).substring(7),
        //                 is_done: false
        //             }
        //         ])
        //     })
        // );

        // const state = ctx.getState();
        // ctx.setState({
        //     ...state,
        //     todoList: [
        //         ...state.todoList,
        //         {
        //             ...payload,
        //             id: Math.random().toString(36).substring(7),
        //             is_done: false
        //         }
        //     ],
        // });
    }
}