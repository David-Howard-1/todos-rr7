import { randomUUID } from 'crypto';
import todos from './todos.json';

type Todo = {
  id: string;
  title: string;
  notes: string;
  is_important: boolean;
  is_complete: boolean;
};

let data: Todo[] = todos;

export function getTodos(): Promise<Todo[]> {
  return Promise.resolve(data);
}

// Function to get a single todo by ID
export function getTodoById(id: string): Promise<Todo | undefined> {
  return Promise.resolve(data.find((todo) => todo.id === id));
}

type AddTodoInput = {
  title: string;
  notes: string;
  is_important: boolean;
};
export function addTodo({
  title,
  is_important,
  notes,
}: AddTodoInput): Promise<string> {
  const id = randomUUID();
  const todo: Todo = {
    id,
    title,
    notes,
    is_important,
    is_complete: false,
  };
  data.push(todo);
  return Promise.resolve('Todo added');
}

type DeleteTodoInput = {
  id: string;
};
export function deleteTodo({ id }: DeleteTodoInput): Promise<string> {
  data.filter((todo) => todo.id !== id);

  return Promise.resolve('Todo deleted.');
}

type UpdateTodoInput = {
  id: string;
  updates: Partial<Todo>;
};
export function updateTodo({
  id,
  updates,
}: UpdateTodoInput): Promise<Todo | undefined> {
  data = data.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo));

  const updatedTodo = data.find((todo) => todo.id === id);
  return Promise.resolve(updatedTodo);
}
