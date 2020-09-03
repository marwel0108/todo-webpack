import { Todo } from './Todo.class';

export class TodoList {

    constructor() {
        this.getTodos();
    }

    newTodo( todo ) {
        this.todos.push( todo );
        this.saveTodos();
    }

    deleteTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.saveTodos();
    }

    toggleTodo( id ) {

        for ( const todo of this.todos ) {

            if ( todo.id == id ) {

                todo.completed = !todo.completed;
                break;
            }
        }
        this.saveTodos();
    }

    deleteCompletedTodos() {
        this.todos = this.todos.filter( todo => 
            todo.completed == false
        );
        this.saveTodos();
    }

    saveTodos() {

        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {

        const items = localStorage.getItem('todos');
        this.todos = (items) ? JSON.parse(items) : [];

        this.todos = this.todos.map( Todo.fromJson );

    }

}

