import { revalidateTag } from "next/cache";
import { REPOS } from "@/lib/content";
import { fromGitHubHooks } from "@/lib/github-hooks";
import { OWNER, readmeTag } from "@/lib/readme";

// GitHub push webhook: a push to a project's default branch drops its cached
// README, so the next visit to /projects/<repo> renders the new one. No
// shared secret; requests are only trusted from GitHub's webhook IP ranges.
export async function POST(req: Request) {
  if (!(await fromGitHubHooks(req))) {
    return Response.json({ error: "not from GitHub" }, { status: 403 });
  }

  const event = req.headers.get("x-github-event");
  if (event === "ping") return Response.json({ ok: true });
  if (event !== "push") return Response.json({ skipped: event });

  const push = await req.json().catch(() => null);
  const repo = push?.repository;
  if (
    repo?.owner?.login !== OWNER ||
    !REPOS.some((r) => r.name === repo.name)
  ) {
    return Response.json({ error: "unknown repo" }, { status: 404 });
  }
  if (push.ref !== `refs/heads/${repo.default_branch}`) {
    return Response.json({ skipped: push.ref });
  }

  revalidateTag(readmeTag(repo.name), { expire: 0 });
  return Response.json({ revalidated: repo.name });
}
