import { type Todo } from 'data/api';
import { Check, Pencil } from 'lucide-react';
import Button from '~/components/Button';
import Card from '~/components/Card';

export default function TodoList({ todos }: { todos: Todo[] }) {
  const todosSorted = todos.sort(
    (a, b) => Number(a.is_complete) - Number(b.is_complete)
  );

  const listItems = todosSorted.map((todo) => (
    <li key={todo.id} className="flex items-center justify-between py-3">
      <p className={`${todo.is_complete && 'line-through text-gray-500'}`}>
        {todo.title}
      </p>
      <div className="flex items-center gap-1">
        <Button className="text-sky-600 bg-transparent">
          <Pencil size={15} />
        </Button>
        <Button className="border border-gray-400 bg-transparent p-0 h-8 w-8">
          {todo.is_complete ? <Check size={18} className="text-green-600" /> : null}
        </Button>
      </div>
    </li>
  ));

  return (
    <Card>
      <ul className="divide-y">{listItems}</ul>
    </Card>
  );
}
