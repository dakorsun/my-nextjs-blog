import { env } from '~/env';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = env.GITHUB_TOKEN;

async function fetchGitHub(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authentication': `Bearer ${GITHUB_TOKEN}`,
      'Content-type': 'application/json',
    },
  });
  return response.json();
}

export const githubRouter = createTRPCRouter({
  getIssues: publicProcedure.query(async () => {
    return fetchGitHub('/repos/dakorsun/my-nextjs-blog/issues');
  }),
});
