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
    <div className="flex flex-col justify-start items-start">
      <span>AdminPage</span>
      <div className="w-fuill p-6">
        <h1>Loaded issues</h1>
        {issues &&
          issues.map(issue => (
            <div key={issue.id} className="w-full flex-col">
              <div>{issue.title}</div>
              <div>{issue.body}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
