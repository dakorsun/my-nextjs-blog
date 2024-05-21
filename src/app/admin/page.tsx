import { api } from '~/trpc/server';

export default async function AdminPage() {
  const hello = await api.test.hello({ text: 'Test for tRPC' });
  return (
    <div className="min-h-screen flex flex-col justify-start items-start">
      <span>AdminPage</span>
      <span>{hello.greeting}</span>
    </div>
  );
}
