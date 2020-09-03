import { Todo, TodoList } from './Classes';
import './styles.css';
import { createTodoHtml } from './js/componentes';

export const todoList = new TodoList();

todoList.todos.forEach( createTodoHtml );