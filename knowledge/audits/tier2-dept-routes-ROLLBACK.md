# Tier 2 — Department routes (UNMERGED)

**Branch:** `cursor/ui-dept-routes-8bc8`  
**Parent:** `cursor/ui-audit-motion-8bc8` (Tier 1)  
**Do not merge** until product review. Show diff only.

## What changed
- Real routes: `/team/bayonne-bees/match|sideline|warmups|alumni`
- Per-department `head` metadata via `departmentHead()`
- PDP back-path → department route (`DEPARTMENT_TO[product.category]`)
- Legacy `/team/$slug` + `#dept` redirects to the matching department (`replace`)

## Rollback
```bash
git checkout main   # or the Tier 1 PR branch without this tip
# or revert this branch:
git revert <merge-commit>   # if ever merged
# or simply close the PR — no production dependency until merge
```

Delete these files to unwind if needed:  
`src/routes/team.$slug.match.tsx`, `…sideline.tsx`, `…warmups.tsx`, `…alumni.tsx`,  
restore prior `team.$slug.index.tsx` store page, remove `TeamStorePage.tsx` / `DEPARTMENT_TO` usage.

## Risk
TanStack static department paths sit beside `$product`. Product ids must never collide with `match|sideline|warmups|alumni` (they do not today).
