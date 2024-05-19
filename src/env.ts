import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

let createdEnv;
try {
  createdEnv = createEnv({
    server: {
      GITHUB_CLIENT_ID: z.string(),
      GITHUB_SECRET: z.string(),
      NEXTAUTH_URL: z.string(),
      NEXTAUTH_SECRET: z.string(),
      ADMIN_EMAIL: z.string(),
    },
    client: {
      NEXT_PUBLIC_NEXTAUTH_URL: z.string(),
      NEXT_PUBLIC_ADMIN_EMAIL: z.string(),
    },
    runtimeEnv: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    },
    emptyStringAsUndefined: true,
  });
} catch (e: unknown) {
  console.error(e);
  throw e;
}

export const env = createdEnv;
