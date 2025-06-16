document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Usuario ficticio
    if (email === "gerencia@swiftbots.com.co" && password === "12345678Sb@") {
      window.location.href = "/Inicio";
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });
});
