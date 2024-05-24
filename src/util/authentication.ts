import { env } from '~/env';
import { Nullable } from '~/util/types';

export function isAdminEmail(email: Nullable<string>) {
  return !!(email && email === env.NEXT_PUBLIC_ADMIN_EMAIL);
}
