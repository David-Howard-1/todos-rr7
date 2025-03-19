import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <main className="flex flex-col w-full h-screen justify-center items-center gap-2">
      <h1 className="text-3xl font-bold">Manage To-dos</h1>
      <Outlet />
    </main>
  );
}
