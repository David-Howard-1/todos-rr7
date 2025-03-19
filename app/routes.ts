import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/layout.tsx', [
    index('routes/todo-list.tsx'),
    route('todos/:todoId', 'routes/todo-form.tsx'),
  ]),
] satisfies RouteConfig;
