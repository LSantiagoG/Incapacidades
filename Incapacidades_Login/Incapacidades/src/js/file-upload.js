import { supabase } from '../lib/supabase.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tipoPersona = document.getElementById("tipoPersona").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const cedula = document.getElementById("nit").value;
    const nombreEmpresa = document.getElementById("nombreEmpresa").value;
    const correo = document.getElementById("email").value;
    const telefono = document.getElementById("numero").value;

    let archivos = {};

    async function subirArchivo(inputId, nombreDestino) {
      const file = document.getElementById(inputId)?.files[0];
      if (!file) return null;
      const filePath = `${nombreDestino}/${crypto.randomUUID()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('documentos-solicitudes')
        .upload(filePath, file);
      if (error) throw error;

      const { data: urlData } = supabase
        .storage
        .from('documentos-solicitudes')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    }

    try {
      if (tipoPersona === 'natural') {
        archivos.rut = await subirArchivo('rutNatural', 'natural/rut');
        archivos.cedula = await subirArchivo('cedulaNatural', 'natural/cedula');
      } else if (tipoPersona === 'juridica') {
        archivos.camara_comercio = await subirArchivo('camaraComercio', 'juridica/camara');
        archivos.rut = await subirArchivo('rut', 'juridica/rut');
        archivos.cedula_representante = await subirArchivo('cedulaRepresentante', 'juridica/rep');
        archivos.cedula_registrante = await subirArchivo('cedulaRegistrante', 'juridica/registrante');
      }

      const { error } = await supabase.from('solicitudes').insert({
        tipo_persona: tipoPersona,
        nombre,
        apellido,
        cedula,
        nombre_empresa: nombreEmpresa,
        correo,
        telefono,
        archivos,
        estado: 'pendiente'
      });

      if (error) throw error;

      // 🔔 Enviar notificación a administración
      await fetch("/api/notificar-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoPersona,
          nombre,
          apellido,
          nombreEmpresa,
          correo,
          telefono,
          archivos,
        }),
      });

      alert("🎉 Solicitud enviada con éxito");
      location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Error al enviar la solicitud.");
    }
  });
});
