# Email notifications

The website sends an email when someone taps the opening heart. The notification contains the event and time only; it does not identify or track the visitor. Email is sent by this Cloudflare Worker through Resend, so provider credentials stay off the public website.

## Configure and deploy

1. Create a Resend account and verify a sender address/domain. Create an API key.
2. Install Node.js, then from this directory run `npx wrangler login` and `npx wrangler deploy`.
3. In the Cloudflare dashboard, open the deployed Worker and add these runtime variables under **Settings > Variables and Secrets**:
   - `ALLOWED_ORIGIN`: the exact website origin, such as `https://yourname.github.io` (no path or trailing slash).
   - `ALERT_TO_EMAIL`: the address that should receive alerts.
   - `ALERT_FROM_EMAIL`: the verified sender address from Resend.
   - `RESEND_API_KEY`: add this as a secret, not a plain-text variable.
4. Copy the Worker URL. In the website's `script.js`, set `notificationEndpoint` to that URL, then deploy the website again.

The endpoint accepts only the `heart_tapped` event and only browser requests from the configured origin. As with any public notification endpoint, requests can still be forged outside a browser; use Cloudflare rate limiting if the endpoint receives abuse.