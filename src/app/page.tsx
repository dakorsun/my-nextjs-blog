'use client';
import { api } from '~/trpc/react';

export default function Home() {
  const { data: issues, isLoading, error } = api.github.getIssuesProtected.useQuery();

  if (isLoading) {
    return <div className="text-red-700">Loading</div>;
  }

  if (error) {
    return <div className="text-red-700">Error: {error.message}</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{JSON.stringify(issues ? Object.keys(issues[0]) : issues, null, 2)}</div>
    </main>
  );
}
