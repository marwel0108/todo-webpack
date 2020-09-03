
export class Todo {

    static fromJson({ id, task, completed, createdDate }) {

        const tempTodo = new Todo(task);

        tempTodo.id = id;
        tempTodo.completed = completed;
        tempTodo.createdDate = createdDate;

        return tempTodo;
    }

    constructor( task ) {

        this.task = task;

        this.id = new Date().getTime();

        this.completed = false;

        this.createdDate = new Date();

    }

}



