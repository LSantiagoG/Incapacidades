document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginSection = document.getElementById('login-section');
    const otpSection = document.getElementById('otp-section');
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');
    const resendBtn = document.getElementById('resend-otp-btn');
    const backToLoginBtn = document.getElementById('back-to-login-btn');
    const countdownSpan = document.getElementById('countdown');
    const emailDisplay = document.getElementById('email-display');
    const otpMessage = document.getElementById('otp-message');

    let userEmail = '';
    let countdownTimer = null;
    let countdownSeconds = 180; // 3 minutos

    // Funcionalidad del toggle de contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            if (isPassword) {
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    }

    // Manejo del formulario de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Deshabilitar el botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
        
        try {
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            const remember = loginForm.querySelector('input[name="remember"]').checked;
            
            if (!email || !password) {
                showError('Por favor completa todos los campos');
                return;
            }

            userEmail = email;
            
            // Primer paso: Verificar credenciales y enviar OTP
            const response = await fetch('/api/auth/login-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Credenciales válidas, mostrar formulario OTP
                showOtpSection();
                showOtpMessage('Código OTP enviado exitosamente', 'success');
            } else {
                showError(result.error || 'Error al iniciar sesión');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('Error de conexión. Por favor, intenta nuevamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Manejo del formulario OTP
    otpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = otpForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
        
        try {
            const otpCode = document.getElementById('otp-code').value;
            
            if (!otpCode || otpCode.length !== 6) {
                showOtpMessage('Por favor ingresa un código válido de 6 dígitos', 'error');
                return;
            }
            
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    token: otpCode,
                    type: 'email'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showOtpMessage('Código verificado exitosamente. Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.href = result.redirectTo || '/inicio';
                }, 1500);
            } else {
                showOtpMessage(result.error || 'Código inválido', 'error');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showOtpMessage('Error de conexión. Por favor, intenta nuevamente.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Botón para reenviar OTP
    resendBtn.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showOtpMessage('Nuevo código OTP enviado', 'success');
                startCountdown();
            } else {
                showOtpMessage(result.error || 'Error al reenviar código', 'error');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showOtpMessage('Error de conexión', 'error');
        }
    });

    // Botón para volver al login
    backToLoginBtn.addEventListener('click', function() {
        showLoginSection();
        clearForm();
    });

    // Funciones auxiliares
    function showOtpSection() {
        loginSection.style.display = 'none';
        otpSection.style.display = 'block';
        emailDisplay.textContent = userEmail;
        startCountdown();
        
        // Limpiar mensaje de error del login
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function showLoginSection() {
        otpSection.style.display = 'none';
        loginSection.style.display = 'block';
        
        // Limpiar countdown si existe
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
    }

    function startCountdown() {
        countdownSeconds = 180;
        resendBtn.disabled = true;
        updateCountdownDisplay();
        
        countdownTimer = setInterval(() => {
            countdownSeconds--;
            updateCountdownDisplay();
            
            if (countdownSeconds <= 0) {
                clearInterval(countdownTimer);
                resendBtn.disabled = false;
                resendBtn.innerHTML = 'Reenviar código';
            }
        }, 1000);
    }

    function updateCountdownDisplay() {
        const minutes = Math.floor(countdownSeconds / 60);
        const seconds = countdownSeconds % 60;
        countdownSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function clearForm() {
        document.getElementById('otp-code').value = '';
        otpMessage.textContent = '';
        otpMessage.className = '';
    }

    function showError(message) {
        // Remover errores previos
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Crear y mostrar nuevo error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
            border: 1px solid #fcc;
            font-size: 14px;
        `;
        errorDiv.textContent = message;
        
        // Insertar antes del formulario
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showOtpMessage(message, type) {
        otpMessage.textContent = message;
        otpMessage.className = type === 'success' ? 'success-message' : 'error-message';
        otpMessage.style.cssText = `
            padding: 10px;
            border-radius: 4px;
            margin-top: 1rem;
            font-size: 14px;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Auto-remover después de 5 segundos para mensajes de error
        if (type === 'error') {
            setTimeout(() => {
                if (otpMessage.textContent === message) {
                    otpMessage.textContent = '';
                    otpMessage.className = '';
                }
            }, 5000);
        }
    }

    // Permitir solo números en el campo OTP
    document.getElementById('otp-code').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});