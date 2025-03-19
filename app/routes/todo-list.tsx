import { getTodos, type Todo } from 'data/api';
import { Check, Pencil } from 'lucide-react';
import Button from '~/components/Button';
import Card from '~/components/Card';
import type { Route } from '../+types/root';
import { Link, useNavigate } from 'react-router';
import TextInput from '~/components/TextInput';

export async function loader() {
  return await getTodos();
}

export default function TodoList({ loaderData }: Route.ComponentProps) {
  const todos = loaderData.data;
  const navigate = useNavigate();

  const todosSorted = todos.sort(
    (a, b) => Number(a.is_complete) - Number(b.is_complete)
  );

  const listItems = todosSorted.map((todo) => (
    <li key={todo.id} className="flex items-center justify-between py-3">
      <p className={`${todo.is_complete && 'line-through text-gray-500'}`}>
        {todo.title}
      </p>
      <div className="flex items-center gap-1">
        <Button
          onClick={() => navigate(`todos/${todo.id}`)}
          className="text-sky-600 bg-transparent"
        >
          <Pencil size={15} />
        </Button>
        <Button className="border-2 border-gray-400 bg-transparent p-0 h-8 w-8 hover:border-sky-400">
          {todo.is_complete ? (
            <Check size={18} className="text-green-600" />
          ) : null}
        </Button>
      </div>
    </li>
  ));

  return (
    <Card className="">
      <div className="flex items-center justify-between">
        <TextInput inputProps={{ placeholder: 'Search todos...' }} />
        <Button className="ml-auto" onClick={() => navigate('todos/new')}>
          Add Todo
        </Button>
      </div>
      <ul className="divide-y text-sm p-1">{listItems}</ul>
    </Card>
  );
}
