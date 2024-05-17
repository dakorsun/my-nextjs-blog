import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
});
