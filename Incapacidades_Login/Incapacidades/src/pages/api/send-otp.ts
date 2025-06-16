import type { APIRoute } from "astro";
import twilio from "twilio";

export const prerender = false;

const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
const verifySid = import.meta.env.TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { telefono } = await request.json();

    if (!telefono || !telefono.startsWith("+")) {
      return new Response("Número inválido. Usa formato +573123456789", { status: 400 });
    }

    const result = await client.verify.v2.services(verifySid).verifications.create({
      to: telefono,
      channel: "sms",
    });

    return new Response("Código enviado correctamente", { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error al enviar código:", error?.message || error);
    return new Response("Error interno al enviar el código", { status: 500 });
  }
};
