import { supabase } from '../lib/supabase.js';
import Swal from 'sweetalert2';

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
        archivos.certificado = await subirArchivo('certificadoBancario', 'juridica/bankcertificate');
      } else if (tipoPersona === 'juridica') {
        archivos.camara_comercio = await subirArchivo('camaraComercio', 'juridica/camara');
        archivos.rut = await subirArchivo('rut', 'juridica/rut');
        archivos.cedula_representante = await subirArchivo('cedulaRepresentante', 'juridica/rep');
        archivos.cedula_registrante = await subirArchivo('cedulaRegistrante', 'juridica/registrante');
        archivos.certificado = await subirArchivo('certificadoBancario', 'juridica/bankcertificate');
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

      // 🔔 Notificar a administración
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

      // ✅ ALERTA AMIGABLE
      await Swal.fire({
        icon: 'success',
        title: `¡Gracias, ${nombre}!`,
        text: 'Tu solicitud fue enviada con éxito. Será revisada y recibirás una respuesta en las próximas 72 horas.',
        confirmButtonText: 'Entendido',
        timer: 8000,
        timerProgressBar: true
      });

      location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar la solicitud',
        text: 'Ocurrió un problema. Por favor intenta nuevamente más tarde.',
        confirmButtonText: 'Cerrar'
      });
    }
  });
});
