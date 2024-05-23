'use client';
import { api } from '~/trpc/react';

export default function AdminPage() {
  const { data: issues, isLoading, error } = api.github.getIssuesProtected.useQuery();

  if (isLoading) {
    return <div className="text-red-700">Loading</div>;
  }

  if (error) {
    return <div className="text-red-700">Error: {error.message}</div>;
  }
  return (
    <div className="min-h-screen flex flex-col justify-start items-start">
      <span>AdminPage</span>
      <div>
        <span>Loaded issues</span>
        <div>{JSON.stringify(Object.keys(issues[0]), null, 2)}</div>
      </div>
    </div>
  );
}
