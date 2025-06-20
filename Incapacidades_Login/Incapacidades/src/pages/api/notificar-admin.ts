import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  console.log("📦 Body recibido:", body); 

  const { nombre, apellido, nombreEmpresa, telefono, correo, tipoPersona, archivos } = body;
 


  try {
    await resend.emails.send({
      from: 'I-Reports <onboarding@resend.dev>',
      to: import.meta.env.ADMIN_EMAIL, 
      subject: '📩 Nueva solicitud registrada',
      html: `
        <h2>Solicitud de ${nombre} ${apellido}</h2>
        <p><strong>Tipo de persona:</strong> ${tipoPersona}</p>
        <p><strong>Empresa:</strong> ${nombreEmpresa}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Numero de telefono:</strong> ${telefono}</p>
        <p><strong>Archivos:</strong></p>
        <ul>
          ${Object.entries(archivos).map(
            ([key, url]) => `<li>${key}: <a href="${url}">${url}</a></li>`
          ).join('')}
        </ul>
        <p><strong>Acciones:</strong></p>
          <div style="margin-top: 20px;">
            <a href="#"
              style="display:inline-block;padding:10px 20px;background:#28a745;color:white;border-radius:5px;text-decoration:none;margin-right:10px;">
              ✅ Aprobar solicitud
            </a>

            <a href="#"
              style="display:inline-block;padding:10px 20px;background:#dc3545;color:white;border-radius:5px;text-decoration:none;">
              ❌ Rechazar solicitud
            </a>
          </div>
        
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    return new Response(JSON.stringify({ error: 'Error enviando correo' }), { status: 500 });
  }
};
