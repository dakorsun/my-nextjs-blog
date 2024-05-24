import { env } from '~/env';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = env.GITHUB_TOKEN;

async function fetchGitHub(endpoint: string, options: RequestInit = {}, token?: string) {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token || GITHUB_TOKEN}`,
      'Content-type': 'application/json',
    },
  });
  return response.json();
}

export const githubRouter = createTRPCRouter({
  getIssues: publicProcedure.query(() => {
    return fetchGitHub('/repos/dakorsun/my-nextjs-blog/issues');
  }),
  getIssuesProtected: protectedProcedure(true).query(({ ctx }) => {
    const { accessToken } = ctx;
    return fetchGitHub('/repos/dakorsun/my-nextjs-blog/issues', {}, accessToken);
  }),
});
