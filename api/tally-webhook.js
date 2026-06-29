import crypto from "node:crypto";
import { Resend } from "resend";

// Disable Vercel's automatic body parsing so we can read the raw bytes Tally
// signed. The HMAC must be computed over the exact payload Tally sent — a
// re-serialized JSON.stringify(req.body) would not match.
export const config = { api: { bodyParser: false } };

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || "noreply@seatsnags.com";
const WEBHOOK_SECRET = process.env.TALLY_WEBHOOK_SECRET;

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

// Tally signs the raw request body with HMAC-SHA256 (base64) using the form's
// signing secret, sent in the `tally-signature` header. Skip verification until
// the secret is configured so the endpoint still works during setup.
function verifySignature(rawBody, signature) {
  if (!WEBHOOK_SECRET) return true;
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("base64");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected),
    );
  } catch {
    return false;
  }
}

// Tally sends fields as an array; find one whose label contains `label`.
function findField(fields, label) {
  const match = fields.find((f) =>
    (f.label || "").toLowerCase().includes(label.toLowerCase()),
  );
  if (!match) return undefined;
  const val = match.value;
  return typeof val === "string" ? val : Array.isArray(val) ? val[0] : undefined;
}

function confirmationHtml(firstName) {
  const greeting = firstName ? `Hey ${firstName},` : "Hey,";
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="margin:0 auto;padding:40px 20px;max-width:560px;">
      <p style="font-size:20px;font-weight:700;color:#1F7A5E;margin:0 0 32px;">SeatSnags</p>
      <h1 style="color:#18181b;font-size:28px;font-weight:700;margin:0 0 24px;line-height:1.2;">You're on the list.</h1>
      <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 16px;">${greeting}</p>
      <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 16px;">Thanks for signing up. You're on the SeatSnags waitlist and we'll reach out as soon as a spot opens up for you.</p>
      <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 16px;">While you wait &mdash; SeatSnags monitors the resale market around the clock and buys the moment tickets matching your price appear. No alerts, no racing to checkout. Just tickets in your inbox.</p>
      <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 16px;">We're rolling out access in small batches to make sure the experience is right. You'll hear from us soon.</p>
      <p style="color:#3f3f46;font-size:16px;line-height:1.6;margin:0 0 16px;">&mdash; The SeatSnags Team</p>
      <div style="border-top:1px solid #e4e4e7;margin-top:40px;padding-top:24px;">
        <p style="color:#71717a;font-size:13px;margin:0 0 4px;">Questions? <a href="mailto:hello@seatsnags.com" style="color:#1F7A5E;text-decoration:none;">hello@seatsnags.com</a></p>
        <p style="color:#71717a;font-size:13px;margin:0 0 4px;"><a href="https://seatsnags.com" style="color:#1F7A5E;text-decoration:none;">seatsnags.com</a></p>
      </div>
    </div>
  </body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await readRawBody(req);

  if (!verifySignature(rawBody, req.headers["tally-signature"])) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const fields = payload?.data?.fields || [];
  const email = findField(fields, "email");
  const firstName = findField(fields, "first") || findField(fields, "name");

  if (!email) {
    console.warn("[tally-webhook] no email field found", {
      labels: fields.map((f) => f.label),
    });
    return res.status(200).json({ received: true });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're on the SeatSnags waitlist",
    html: confirmationHtml(firstName),
  });

  if (error) {
    console.error("[tally-webhook] resend error", error);
    return res.status(500).json({ error: "Failed to send email" });
  }

  return res.status(200).json({ received: true });
}
