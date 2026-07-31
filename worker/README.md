# The judge proxy

Boss rounds end with a written answer. Without a proxy the app scores it with
the offline training-room judge, which reads the *shape* of an answer — whether
it engages the objection, whether it concedes anything, whether a steelman
smuggles in a rebuttal — but cannot tell whether what you wrote is true.

This Worker gives you the real thing: a model that reads the answer and scores
it on the merits. It holds the API key server-side, which is the only safe
place for it. **Never put a key in the app repo — it is public.**

## Deploy it (about five minutes)

1. Get an API key at [console.anthropic.com](https://console.anthropic.com) →
   **API keys**. Set a spend limit on it while you're there.
2. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com) →
   **Workers & Pages** → **Create** → **Start with Hello World** → **Deploy**.
3. Open the new Worker → **Edit code**. Delete what's there, paste in
   [`worker.js`](./worker.js), **Deploy**.
4. Back on the Worker → **Settings** → **Variables and Secrets** → **Add** →
   type **Secret**, name `ANTHROPIC_API_KEY`, value your key → **Deploy**.
5. Copy the Worker's URL (`https://something.workers.dev`).
6. In the app: path screen → **Who scores your writing** → **change judge** →
   **My endpoint** → paste the URL. It saves as you type.

Throw a boss answer at it. If the card comes back without the "training-room
judge" label, it's live.

## What it does and doesn't allow

- Only the origins in `ALLOWED` may call it. If the site moves to a custom
  domain, add it there or every request gets a 403.
- The model and token ceiling are fixed inside the Worker, not taken from the
  request. A tampered page cannot point your key at a bigger model.
- Answers over 12,000 characters are rejected before they cost anything.
- There is no rate limiting. Cloudflare's free tier caps at 100,000 requests a
  day, which is far more than a personal dojang will ever use, but the spend
  limit on the key is what actually protects you. Set one.

## Cost

A boss round is roughly 700 tokens in and 200 out. At Sonnet pricing that is a
fraction of a cent per round — all 8 bosses cost less than a few cents.

## If it doesn't work

The app now reports what actually failed rather than one catch-all message.

| What you see | What it means |
|---|---|
| rejected the credentials | The secret is missing, misnamed, or the key is revoked. It must be named `ANTHROPIC_API_KEY` exactly. |
| Couldn't reach your endpoint | Wrong URL, or your site's origin isn't in `ALLOWED`. |
| Rate limited | Anthropic is throttling. Wait and resend. |
| model id was rejected | The id in `MODEL` has been retired. Update it in `worker/worker.js` *and* `src/judge.js`. |

Any failure falls through to the training-room judge, so a boss can always be
finished either way.

## Other hosts

Nothing here is Cloudflare-specific beyond the `export default { fetch }`
shape. A Netlify or Vercel function doing the same three things — check the
origin, add `x-api-key`, forward to `https://api.anthropic.com/v1/messages` —
works identically. Paste that URL instead.
