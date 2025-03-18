import type { Route } from './+types/home';
import Card from '~/components/Card';
import TextInput from '~/components/TextInput';
import TextAreaInput from '~/components/TextAreaInput';
import Button from '~/components/Button';
import { addTodo, getTodos } from 'data/api';
import { Form } from 'react-router';
import TodoList from './todo-list';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Todo App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader() {
  return await getTodos();
}

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let title = formData.get('title');
  let notes = formData.get('notes');
  let importance = formData.get('importance');

  let todo = await addTodo({
    title: String(title),
    notes: String(notes),
    importance: Number(importance),
  });
  return todo;
}

const IMPORTANCE_LEVELS = [1, 2, 3, 4, 5];

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center gap-2">
      <h1 className="text-3xl font-bold">Manage To-dos</h1>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <Form className="flex flex-col gap-4" method="post">
            <TextInput label="Title" inputProps={{ name: 'title' }} />
            <TextAreaInput
              label="Notes"
              textareaProps={{ name: 'notes', rows: 4 }}
            />
            <fieldset>
              <legend>Importance</legend>
              <div className="flex gap-3">
                {IMPORTANCE_LEVELS.map((lvl) => (
                  <div key={lvl}>
                    <input
                      type="radio"
                      name="importance"
                      value={lvl}
                      id={`importance${lvl}`}
                      defaultChecked={lvl === 1}
                      className=""
                    />
                    <label className="ml-1" htmlFor={`importance${lvl}`}>
                      {lvl}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <Button className="self-end" type="submit">
              Save
            </Button>
          </Form>
        </Card>
        <TodoList todos={loaderData.data} />
      </div>
    </main>
  );
}
