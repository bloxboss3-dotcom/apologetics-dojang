/* Judge proxy for Apologetics Dojang.
 *
 * The browser cannot hold an Anthropic API key — this repo is public and the
 * site is static. This Worker holds the key server-side, forwards the request,
 * and returns Anthropic's reply unchanged. Deploy it, paste its URL into the
 * app under "Who scores your writing" → My endpoint.
 *
 * See worker/README.md for the five-minute version.
 */

const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 1000;
const MAX_CHARS = 12000;

/* Only these origins may call the proxy. Add a custom domain here if the site
 * ever moves. An open proxy is someone else's free API credit. */
const ALLOWED = [
  "https://bloxboss3-dotcom.github.io",
  "http://localhost:5173",
];

const cors = (origin) => ({
  "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const fail = (status, message, origin) =>
  new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST") return fail(405, "POST only.", origin);
    if (origin && !ALLOWED.includes(origin)) return fail(403, "This proxy doesn't serve that origin.", origin);
    if (!env.ANTHROPIC_API_KEY) return fail(500, "The proxy has no API key configured.", origin);

    let body;
    try { body = await request.json(); } catch (e) { return fail(400, "Body wasn't JSON.", origin); }

    const messages = Array.isArray(body?.messages) ? body.messages : null;
    if (!messages || !messages.length) return fail(400, "No messages in the request.", origin);

    /* Ignore whatever model and limits the client asked for. The proxy decides,
       so a tampered page can't run up a bill on a larger model. */
    const size = JSON.stringify(messages).length;
    if (size > MAX_CHARS) return fail(413, "That answer is too long to judge.", origin);

    let upstream;
    try {
      upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, messages }),
      });
    } catch (e) {
      return fail(502, "Couldn't reach Anthropic.", origin);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  },
};
