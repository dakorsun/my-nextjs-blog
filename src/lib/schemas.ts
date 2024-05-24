import { z } from 'zod';

export const GithubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  node_id: z.string(),
  avatar_url: z.string(),
  url: z.string(),
  html_url: z.string(),
});

export const GithubIssueSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  user: GithubUserSchema,
});
export const GithubIssuesListSchema = z.array(GithubIssueSchema);

export type GithubUser = z.infer<typeof GithubUserSchema>;
export type GithubIssue = z.infer<typeof GithubIssueSchema>;
export type GithubIssuesList = z.infer<typeof GithubIssuesListSchema>;
