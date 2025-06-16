import type { APIRoute } from "astro";
import twilio from "twilio";

export const prerender = false;

const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.TWILIO_AUTH_TOKEN;
const verifySid = import.meta.env.TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { telefono, codigo } = await request.json();

    if (!telefono || !codigo) {
      return new Response("Faltan datos", { status: 400 });
    }

    const result = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: telefono,
      code: codigo,
    });

    if (result.status === "approved") {
      return new Response("Verificación exitosa", { status: 200 });
    } else {
      return new Response("Código incorrecto", { status: 401 });
    }

  } catch (error: any) {
    console.error("Error verificando código:", error?.message || error);
    return new Response("Error interno", { status: 500 });
  }
};
