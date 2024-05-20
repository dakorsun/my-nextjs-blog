'use client';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';

import { isAdminEmail } from '~/util/authentication';

const adminProtectedRoutes = ['/admin'];

export function AdminProtectedRoute() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = isAdminEmail(session?.user?.email ?? null);
  if (!isAdmin && pathname && adminProtectedRoutes.includes(pathname)) {
    redirect('/');
  }
  return <></>;
}
