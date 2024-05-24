import { env } from '~/env';
import { GithubIssuesList, GithubIssuesListSchema } from '~/lib/schemas';
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

async function fetchIssues(accessToken?: string) {
  const data = await fetchGitHub('/repos/dakorsun/my-nextjs-blog/issues');
  const result = GithubIssuesListSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  return [];
}

export const githubRouter = createTRPCRouter({
  getIssues: publicProcedure.query<GithubIssuesList>(() => {
    return fetchIssues();
  }),
  getIssuesProtected: protectedProcedure(true).query(({ ctx }) => {
    const { accessToken } = ctx;
    return fetchIssues(accessToken);
  }),
});
