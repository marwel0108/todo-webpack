import { Todo } from "../Classes";

import { todoList } from '../index';

// Html
const divTodoList = document.querySelector('.todo-list');
const input = document.querySelector('.new-todo');
const deleteTodos = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const createTodoHtml = ( todo ) => {

    const Todo = `
    <li class="${ (todo.completed) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : '' }>
            <label>${ todo.task }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = Todo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos

input.addEventListener('keyup', (event) => {
    if ( event.keyCode === 13 && input.value.length > 0 ) {

        const newTodo = new Todo( input.value );
        todoList.newTodo( newTodo );
        createTodoHtml( newTodo );
        input.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const elementName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if ( elementName.includes('input') ) {

        todoList.toggleTodo( todoId );
        todoElement.classList.toggle('completed');

    } else if ( elementName.includes('button')) {

        todoList.deleteTodo( todoId );
        divTodoList.removeChild(  todoElement );
    }

});

deleteTodos.addEventListener('click', () => {

    todoList.deleteCompletedTodos();

    for ( let i = divTodoList.children.length - 1; i >= 0; i--) {

        const element = divTodoList.children[i];

        if (element.classList.contains('completed') ) {
            divTodoList.removeChild(element);
        }
    }

});

ulFilter.addEventListener('click', (event) => {

    const filter = event.target.text;

    if ( !filter ) { return; }

    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');


    for ( const element of divTodoList.children ) {

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        

        switch(  filter ) {

            case 'Pendientes':
                if ( completed ) {
                    element.classList.add('hidden');
                }
                break;

            case 'Completados':
                if ( !completed ) {
                    element.classList.add('hidden');
                }
                break;
        }

    }
});

