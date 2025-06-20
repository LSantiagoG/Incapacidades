import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { id, aprobado, usuario, contrasena } = body;

  const { data: solicitud, error: fetchError } = await supabase
    .from('solicitudes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !solicitud) {
    return new Response(JSON.stringify({ error: 'Solicitud no encontrada' }), { status: 404 });
  }

  const nuevoEstado = aprobado ? 'aprobado' : 'rechazado';

  const { error: updateError } = await supabase
    .from('solicitudes')
    .update({
      estado: nuevoEstado,
      usuario: aprobado ? usuario : null,
      contrasena: aprobado ? contrasena : null
    })
    .eq('id', id);

  if (updateError) {
    return new Response(JSON.stringify({ error: 'Error actualizando solicitud' }), { status: 500 });
  }

  const mensaje = aprobado
    ? {
        subject: '✅ Solicitud aprobada - I-Reports',
        html: `
          <h2>¡Hola ${solicitud.nombre}!</h2>
          <p>Tu solicitud ha sido <strong>aprobada</strong>.</p>
          <p>Estos son tus datos de acceso:</p>
          <ul>
            <li><strong>Usuario:</strong> ${usuario}</li>
            <li><strong>Contraseña:</strong> ${contrasena}</li>
          </ul>
        `
      }
    : {
        subject: '❌ Solicitud rechazada - I-Reports',
        html: `
          <h2>Hola ${solicitud.nombre},</h2>
          <p>Lamentamos informarte que tu solicitud fue <strong>rechazada</strong>.</p>
          <p>No se habilitará acceso a la plataforma.</p>
        `
      };

  await resend.emails.send({
    from: 'I-Reports <onboarding@resend.dev>',
    to: solicitud.correo,
    subject: mensaje.subject,
    html: mensaje.html
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
