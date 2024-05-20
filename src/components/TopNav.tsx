'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Nullable } from '~/util/types';
import { isAdminEmail } from '~/util/authentication';
import { Button } from '~/components/ui/button';

interface IAdminButtonProps {
  email: Nullable<string>;
}
function AdminButton({ email }: IAdminButtonProps) {
  const pathname = usePathname();
  const isDisplaying = useMemo(() => {
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdmin = isAdminEmail(email);
    return !isAdminRoute && isAdmin;
  }, [email, pathname]);
  if (isDisplaying) {
    return <Link href="admin">Admin</Link>;
  }
  return <></>;
}

interface IAuthButtonProps {
  session: Session | null;
  sessionLoading: boolean;
}
function AuthButton({ session, sessionLoading }: IAuthButtonProps) {
  if (session) {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
  }
  if (sessionLoading) {
    return <div>...Loading</div>;
  }
  return <Button onClick={() => signIn()}>Sign in</Button>;
}

export default function TopNav() {
  const { data: session, status } = useSession();
  const isSessionLoading = useMemo(() => status === 'loading', [status]);
  return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
      <div>
        <Link href="/">My NextJs Blog</Link>
      </div>
      <div className="flex items-center justify-between gap-2">
        <AdminButton email={session?.user?.email ?? null} />
        <AuthButton session={session} sessionLoading={isSessionLoading} />
      </div>
    </nav>
  );
}
