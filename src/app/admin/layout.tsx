import { AdminProtectedRoute } from '~/components/AdminProtectedRoute';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminProtectedRoute />
      {children}
    </>
  );
}
