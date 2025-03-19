import { addTodo, getTodoById } from 'data/api';
import type { Route } from '../+types/root';
import Card from '~/components/Card';
import { Form, Link, redirect } from 'react-router';
import TextInput from '~/components/TextInput';
import TextAreaInput from '~/components/TextAreaInput';
import { IMPORTANCE_LEVELS } from 'lib/importanceLevels';
import Button from '~/components/Button';
import { ArrowLeft } from 'lucide-react';

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  let todo;
  if (id) {
    todo = await getTodoById(id);
  }

  return todo;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  const notes = formData.get('notes');
  const importance = formData.get('importance');

  try {
    await addTodo({
      title: String(title),
      notes: String(notes),
      importance: Number(importance),
    });
  } catch {
    return;
  }

  return redirect('/');
}

export default function TodoForm({ params, loaderData }: Route.ComponentProps) {
  const { title, notes, importance } = loaderData.data;

  return (
    <Card className="">
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
        <div className="flex justify-between items-center">
          <Link
            className="text-sm flex items-center justify-start gap-1"
            to={'/'}
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </Link>
          <Button className="self-end" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
}
