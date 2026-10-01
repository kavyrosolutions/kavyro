---
name: kavyro-prod
description: Release the kavyro site to production. Runs /kavyro-staging first to land all open PRs into staging, rebases staging onto main so history stays linear, opens a staging → main PR, waits for its checks to pass, merges it with GitHub's rebase method, and resets staging to match main. Handles conflicts along the way. Use when the user runs /kavyro-prod or asks to release, ship or deploy to production/main.
---

# /kavyro-prod

Ship `staging` to `main`. Merging into `main` deploys kavyrosolutions.com
through the Cloudflare Worker `kavyro-prod`. Always rebase and never
merge: no `git merge`, no merge commits, and `gh pr merge --rebase` only.

Running this skill is the user's authorization to run `/kavyro-staging`, to
force-push `staging` (with lease) in steps 2 and 6 only, to open the release PR
and to merge it into `main`. Never push to `main` directly.

## 1. Land everything into staging

Invoke the `kavyro-staging` skill (`.claude/skills/kavyro-staging/SKILL.md`)
and follow it to the end. PRs it skips stay open and are not part of this
release. Mention them in the final report. If its preflight fails (dirty
tree, gh not authenticated), stop here.

## 2. Put staging on top of main

```bash
git fetch origin --prune
git rev-list --count origin/staging..origin/main   # commits on main that staging lacks
git rev-list --count origin/main..origin/staging   # commits to release
```

If there is nothing to release, say so and stop.

If `main` has commits that `staging` lacks (old merge commits, or a hotfix
made straight on `main`), rebase `staging` onto `main`:

```bash
OLD=$(git rev-parse origin/staging)
git branch -f backup/staging-$(date +%Y%m%d-%H%M%S) $OLD   # local safety net
git checkout -B staging origin/staging
git rebase origin/main
```

The rebase drops merge commits and skips commits whose changes are already
on `main`. Resolve any conflict using the rules in the `kavyro-staging` skill
("Resolving conflicts"), then run `git add` and
`GIT_EDITOR=true git rebase --continue`. If a conflict cannot be resolved with
confidence, run `git rebase --abort` and stop. Report the conflict; do not
release half a staging.

Check the result, then push:

```bash
git grep -nE '^(<<<<<<<|=======|>>>>>>>)( |$)' -- . ':!*.md'   # must print nothing
git diff --stat $OLD HEAD    # empty unless main had a hotfix; if not empty, every line must come from main
git push --force-with-lease=staging:$OLD origin staging
```

If the lease is rejected, someone pushed to `staging` meanwhile, so start
step 2 again.

## 3. Open the release PR

Reuse an open `staging` → `main` PR if there is one. Otherwise create one:

```bash
gh pr list --repo kavyrosolutions/kavyro --base main --head staging --state open --json number
gh pr create --repo kavyrosolutions/kavyro --base main --head staging \
  --title "release: staging → main ($(date +%Y-%m-%d))" \
  --body "<one line per commit in origin/main..origin/staging, plus the PRs /kavyro-staging landed>"
```

## 4. Wait for the release PR's checks

This is the only CI gate in the release. The PRs that `/kavyro-staging`
landed carry no checks of their own. The build that proves the combined
code works is the one that ran on the `staging` head this PR points at:
Cloudflare's "Workers Builds: kavyro", which deploys
staging.kavyrosolutions.com.

```bash
gh pr checks <number> --repo kavyrosolutions/kavyro --watch --fail-fast
```

A check can take a few seconds to appear after a push, so if `gh` reports no
checks yet, wait and run it again (at most a few tries, about a minute in
all). Then confirm the result:

```bash
gh pr checks <number> --repo kavyrosolutions/kavyro --json name,state,link \
  --jq '.[] | .name+" "+.state+" "+.link'
```

Merge only when every check is `SUCCESS` (or `SKIPPED`) and
"Workers Builds: kavyro" is among them. Otherwise stop, do not merge, and
leave the PR open. Report the failing or missing check with its link. Open
that link in the Cloudflare dashboard to read the build log if the user asks
why it failed.

## 5. Merge it

```bash
gh pr merge <number> --repo kavyrosolutions/kavyro --rebase
```

Never pass `--delete-branch`: `staging` is permanent.

If GitHub reports a conflict or says the branch is out of date, `main` moved.
Go back to step 2, then do step 4 again before retrying this step, once.

## 6. Reset staging to main

GitHub's rebase merge rewrites the commits on `main`, so `staging` now
holds the same changes under different hashes. Point `staging` at `main` so
the next release starts level:

```bash
git fetch origin
OLD=$(git rev-parse origin/staging)
git diff --quiet origin/main $OLD && \
  git push --force-with-lease=staging:$OLD origin origin/main:refs/heads/staging
```

If `git diff` is not quiet, something landed on `staging` after the merge.
Leave `staging` alone and report it; the next `/kavyro-prod` will rebase it.

## 7. Finish

Check out the branch the user started on (or `staging`, updated to
`origin/staging`, if that branch was deleted). Check the production deploy
once, without polling in a loop:

```bash
gh api repos/kavyrosolutions/kavyro/commits/$(git rev-parse origin/main)/check-runs \
  --jq '.check_runs[] | select(.name|test("kavyro-prod")) | .name+" "+.status+" "+(.conclusion//"")'
```

Report in a few lines: the release PR link, what shipped, PRs that were
skipped, conflicts resolved, and the deploy status (or that it is still
running).
