export class AddTodo {
    static readonly type = '[Todo] Add';
    constructor(public payload: any) { }
}

export class EditTodo {
    static readonly type = '[Todo] Edit';
    constructor(public payload: any) { }
}

export class FetchAllTodos {
    static readonly type = '[Todo] Fetch All';
}

export class DeleteTodo {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) { }
}

export class markDone {
    static readonly type = '[Todo] markDone';
    constructor(public id: string, public is_done: boolean) { }
}