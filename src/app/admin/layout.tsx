import { AdminProtectedRoute } from '~/components/AdminProtectedRoute';
import { api } from '~/trpc/server';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const issues = await api.github.getIssues();
  return (
    <>
      <AdminProtectedRoute />
      <div>{JSON.stringify(Object.keys(issues[0]), null, 2)}</div>
      {children}
    </>
  );
}
