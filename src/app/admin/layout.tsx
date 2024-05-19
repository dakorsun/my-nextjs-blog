import { AdminProtectedRoute } from '../_components/AdminProtectedRoute';

export default function AdminLayout({
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
