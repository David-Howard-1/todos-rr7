import { randomUUID } from 'crypto';
import db from './todos.json';

type DataResponse<T> = {
  data: T;
  message: string;
};

export type Todo = {
  id: string;
  title: string;
  notes: string;
  importance: number;
  is_complete: boolean;
};

let todos: Todo[] = db;

export function getTodos(): Promise<DataResponse<Todo[]>> {
  return Promise.resolve({ data: todos, message: 'Todos retrieved' });
}

// Function to get a single todo by ID
export function getTodoById(
  id: string
): Promise<DataResponse<Todo | undefined>> {
  return Promise.resolve({
    data: todos.find((todo) => todo.id === id),
    message: 'Todo retrieved',
  });
}

type AddTodoInput = {
  title: string;
  notes: string;
  importance: number;
};
export function addTodo({
  title,
  importance,
  notes,
}: AddTodoInput): Promise<DataResponse<Todo>> {
  const id = randomUUID();
  const todo: Todo = {
    id,
    title,
    notes,
    importance,
    is_complete: false,
  };
  todos.push(todo);
  return Promise.resolve({ data: todo, message: 'Todo added' });
}

type DeleteTodoInput = {
  id: string;
};
export function deleteTodo({
  id,
}: DeleteTodoInput): Promise<DataResponse<string>> {
  todos.filter((todo) => todo.id !== id);

  return Promise.resolve({ data: id, message: 'Todo deleted' });
}

type UpdateTodoInput = {
  id: string;
  updates: Partial<Todo>;
};
export function updateTodo({
  id,
  updates,
}: UpdateTodoInput): Promise<DataResponse<Todo | undefined>> {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...updates } : todo
  );

  const updatedTodo = todos.find((todo) => todo.id === id);
  return Promise.resolve({ data: updatedTodo, message: 'Todo updated' });
}
