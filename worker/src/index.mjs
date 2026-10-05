export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin");

        if (!origin || origin !== env.ALLOWED_ORIGIN) {
            return new Response("Forbidden", { status: 403 });
        }

        const headers = {
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Vary": "Origin"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers });
        }

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers });
        }

        if (!request.headers.get("Content-Type")?.includes("application/json")) {
            return new Response("Unsupported media type", { status: 415, headers });
        }

        const body = await request.text();

        if (body.length > 1024) {
            return new Response("Request too large", { status: 413, headers });
        }

        let payload;
        try {
            payload = JSON.parse(body);
        } catch {
            return new Response("Invalid JSON", { status: 400, headers });
        }

        if (!payload || payload.event !== "heart_tapped") {
            return new Response("Invalid event", { status: 400, headers });
        }

        if (!env.RESEND_API_KEY || !env.ALERT_FROM_EMAIL || !env.ALERT_TO_EMAIL) {
            return new Response("Email service is not configured", { status: 503, headers });
        }

        let emailResponse;
        try {
            emailResponse = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: env.ALERT_FROM_EMAIL,
                    to: [env.ALERT_TO_EMAIL],
                    subject: "Someone started your website",
                    text: `Someone tapped the heart on your website at ${new Date().toISOString()}.`
                })
            });
        } catch {
            return new Response("Email service unavailable", { status: 502, headers });
        }

        if (!emailResponse.ok) {
            return new Response("Could not send notification", { status: 502, headers });
        }

        return new Response("Notification sent", { status: 202, headers });
    }
};