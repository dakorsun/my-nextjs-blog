'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Nullable } from '~/util/types';
import { isAdminEmail } from '~/util/authentication';
import { Button } from '~/components/ui/button';
import { ThemeModeToggle } from './ui/theme-mode-toggle';

interface IAdminButtonProps {
  email: Nullable<string>;
}
function AdminButton({ email }: IAdminButtonProps) {
  const pathname = usePathname();
  const isDisplaying = useMemo(() => {
    return isAdminEmail(email);
  }, [email]);
  const isDisabled = useMemo(() => {
    return pathname.startsWith('/admin');
  }, [pathname]);
  if (isDisplaying) {
    return (
      <Button variant="link" disabled={isDisabled} size="default">
        <Link className="text-primary" href="admin">
          Admin
        </Link>
      </Button>
    );
  }
  return <></>;
}

interface IAuthButtonProps {
  session: Session | null;
  sessionLoading: boolean;
}
function AuthButton({ session, sessionLoading }: IAuthButtonProps) {
  if (session) {
    return (
      <Button variant="outline" size="default" onClick={() => signOut()}>
        Sign Out
      </Button>
    );
  }
  if (sessionLoading) {
    return <div>...Loading</div>;
  }
  return (
    <Button variant="outline" size="default" onClick={() => signIn()}>
      Sign in
    </Button>
  );
}

export default function TopNav() {
  const { data: session, status } = useSession();
  const isSessionLoading = useMemo(() => status === 'loading', [status]);
  return (
    <nav className="bg-secondary flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
      <div className="flex items-center gap-2 justify-between">
        <Link href="/" className="text-accent-foreground">
          My NextJs Blog
        </Link>
      </div>
      <div className="flex items-center justify-between gap-2">
        <AdminButton email={session?.user?.email ?? null} />
        <ThemeModeToggle />
        <AuthButton session={session} sessionLoading={isSessionLoading} />
      </div>
    </nav>
  );
}
