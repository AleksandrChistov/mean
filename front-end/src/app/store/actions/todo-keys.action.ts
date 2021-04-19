export class AddTodoKeys {
    static readonly type = '[Todo] Add keys';
    constructor(public keys: string[], public name: string) { }
}