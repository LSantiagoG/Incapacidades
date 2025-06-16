
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput  = document.querySelector('#password');

  if (!togglePassword || !passwordInput) return;

  togglePassword.addEventListener('click', () => {

    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;


    const icon = togglePassword.querySelector('i');
    icon.classList.toggle('mdi-eye-outline');
    icon.classList.toggle('mdi-eye-off-outline');
  });
});
