let telefonoGuardado = "";

document.addEventListener("DOMContentLoaded", () => {
  const otpForm = document.getElementById("otp-form");
  const mensaje = document.getElementById("mensaje");

  const verificarForm = document.getElementById("verificar-form");
  const verificarMensaje = document.getElementById("verificar-mensaje");

  // Enviar OTP
  otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    mensaje.textContent = "Enviando...";
    mensaje.style.color = "#333";

    const telefonoInput = document.getElementById("telefono");
    telefonoGuardado = telefonoInput.value;

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telefono: telefonoGuardado }),
    });

    if (res.ok) {
      mensaje.style.color = "green";
      mensaje.textContent = "✅ Código enviado. Revisa tu teléfono.";
    } else {
      const errorText = await res.text();
      mensaje.style.color = "red";
      mensaje.textContent = `❌ Error: ${errorText}`;
    }
  });

  // Verificar OTP
  verificarForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    verificarMensaje.textContent = "Verificando...";
    verificarMensaje.style.color = "#333";

    const codigo = document.getElementById("codigo").value;

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telefono: telefonoGuardado, codigo }),
    });

    if (res.ok) {
      verificarMensaje.style.color = "green";
      verificarMensaje.textContent = "✅ Verificación exitosa.";

      // 🔁 Redirige al dashboard/inicio luego de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Inicio";
      }, 1500);
    } else {
      const errorText = await res.text();
      verificarMensaje.style.color = "red";
      verificarMensaje.textContent = `❌ Error: ${errorText}`;
    }
  });
});
