'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useMemo } from 'react';

interface IAuthButtonProps {
  session: Session | null;
  sessionLoading: boolean;
}
function AuthButton({ session, sessionLoading }: IAuthButtonProps) {
  if (session) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  if (sessionLoading) {
    return <div>...Loading</div>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
}

export default function TopNav() {
  const { data: session, status } = useSession();
  const isSessionLoading = useMemo(() => status === 'loading', [status]);
  return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
      <div>My NextJs Blog</div>
      <AuthButton session={session} sessionLoading={isSessionLoading} />
    </nav>
  );
}
