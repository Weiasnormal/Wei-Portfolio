# Guestbook backend plan

Status: **not implemented.** The UI in `src/components/guestbook/Guestbook.tsx` is live with posting disabled. This is the plan for turning it on.

## Goals

- Anyone can leave a short note or a reaction without an account.
- Nothing appears publicly until it's approved.
- Spam and abuse are cheap to block and never reach the public list.

## Data (Supabase Postgres)

```sql
create table guestbook_entries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default 'Anonymous' check (char_length(name) <= 32),
  message     text check (char_length(message) <= 200),
  reaction    text check (reaction in ('Nice design', 'Let''s collab', 'Good luck on OJT')),
  approved    boolean not null default false,   -- moderation flag
  ip_hash     text not null,                    -- sha256(ip + secret salt), never the raw IP
  created_at  timestamptz not null default now(),
  check (message is not null or reaction is not null)
);

create index on guestbook_entries (approved, created_at desc);
create index on guestbook_entries (ip_hash, created_at desc);
```

### Row-level security

- Enable RLS.
- `anon` may **select** only `approved = true` rows, and only the columns `id, name, message, reaction, created_at`. Expose them through a view (`guestbook_public`) so `ip_hash` is never readable.
- `anon` has **no insert** policy. All writes go through the server route below using the service-role key, which never reaches the browser.

## Write path: `POST /api/guestbook` (Route Handler)

Checks run in this order. Any failure returns a generic error.

1. **Honeypot.** The form has a hidden `website` field, positioned off-screen with `tabIndex={-1}` and `aria-hidden`. If it's filled, return `200 OK` and store nothing, so bots don't learn they were caught.
2. **Cloudflare Turnstile.** The client renders the Turnstile widget (managed mode) and sends its token. The server verifies it against `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRET_KEY` and the visitor IP.
3. **Validation.** Trim the fields. `name` is at most 32 chars (empty means "Anonymous"). `message` is at most 200 chars. `reaction` must be in the allowlist, and at least one of `message` or `reaction` must be present. Reject URLs (`https?://`, `www.`), matching the prototype's rule.
4. **Rate limit.** Allow at most 1 post per 30 s and 5 per 24 h per `ip_hash`, counted from `guestbook_entries` (`where ip_hash = $1 and created_at > now() - interval ...`). That's enough at this traffic. If it ever isn't, move the limit to Upstash Redis.
5. **Insert** with `approved = false`. Respond with `{ status: "pending" }`, and have the UI show "Posted. It will show to everyone after review."

## Moderation

- New rows wait in the Supabase table editor with `approved = false`.
- Optional: a database webhook sends a Telegram or email ping on insert. The same pattern as the DriveMinded approval flow would work, approving with one tap.
- Approve means set `approved = true`. Reject means delete the row.

## Read path

- The guestbook page (a server component) selects the latest 50 rows from `guestbook_public` with `revalidate = 60`, or with `revalidateTag('guestbook')` called after an approval.
- The example messages are removed once there's at least one real approved entry.

## Env vars

| Name | Where | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | server | |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Never prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client | Only if the list is ever read client-side |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | client | |
| `TURNSTILE_SECRET_KEY` | server only | |
| `GUESTBOOK_IP_SALT` | server only | Random 32+ bytes |

## UI changes when it ships

- Add the honeypot input and the Turnstile widget to the form.
- Enable the Post button, and replace the "Coming soon" note with live status messages in the existing `aria-live` area.
- Show the visitor's own submission locally with a "Waiting for review" tag. It doesn't appear for other visitors until approved.
