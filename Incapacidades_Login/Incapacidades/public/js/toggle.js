document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.querySelector('#password');

  if (!togglePassword || !passwordInput) return;

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Cambiar iconos
    const eyeOpen = togglePassword.querySelector('.eye-open');
    const eyeClosed = togglePassword.querySelector('.eye-closed');
    
    if (type === 'text') {
      // Mostrar contraseña - mostrar icono de ojo cerrado
      eyeOpen.style.display = 'none';
      eyeClosed.style.display = 'block';
    } else {
      // Ocultar contraseña - mostrar icono de ojo abierto
      eyeOpen.style.display = 'block';
      eyeClosed.style.display = 'none';
    }
  });
});