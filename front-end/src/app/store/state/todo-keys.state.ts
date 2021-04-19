import { Action, State, StateContext } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { AddTodoKeys } from "../actions/todo-keys.action";

export interface ITodoKeysStateModel {
    [key: string]: string[]
}

export interface ITodosKeysStateModel {
    todoKeys: ITodoKeysStateModel[]
}

@State<ITodosKeysStateModel>({
    name: 'todo_key',
    defaults: {
        todoKeys: []
    }
})
export class TodoKeysState {
    @Action(AddTodoKeys)
    add({ patchState, getState }: StateContext<ITodosKeysStateModel>, { keys, name }: AddTodoKeys) {
        const state = getState();
        patchState({
            todoKeys: [
                ...state.todoKeys,
                {
                    [name]: keys
                }
            ]
        })
        // setState(
        //     patch({
        //         todoKeys: {
        //             ...getState().todoKeys,
        //             [name]: keys
        //         }
        //     })
        // )
    }
}