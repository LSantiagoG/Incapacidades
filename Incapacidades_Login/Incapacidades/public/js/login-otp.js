document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginSection = document.getElementById('login-section');
    const otpSection = document.getElementById('otp-section');
    const loginForm = document.getElementById('login-form');
    const verificarForm = document.getElementById('verificar-form');
    const reenviarBtn = document.getElementById('reenviar-otp');
    const volverBtn = document.getElementById('volver-login');
    const countdownSpan = document.getElementById('countdown');
    
    // Variables globales
    let userEmail = '';
    let countdownTimer = null;
    let timeLeft = 180; // 3 minutos

    // Funciones de utilidad
    function showError(message, formElement) {
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
        formElement.insertBefore(errorDiv, formElement.firstChild);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showSuccess(message, formElement) {
        // Remover mensajes previos
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear y mostrar mensaje de éxito
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
            border: 1px solid #c3e6cb;
            font-size: 14px;
        `;
        successDiv.textContent = message;
        
        // Insertar antes del formulario
        formElement.insertBefore(successDiv, formElement.firstChild);
    }

    function showLoginSection() {
        loginSection.style.display = 'block';
        otpSection.style.display = 'none';
        // Limpiar formulario OTP
        document.getElementById('codigo').value = '';
        // Detener countdown si está activo
        if (countdownTimer) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
    }

    function showOTPSection() {
        loginSection.style.display = 'none';
        otpSection.style.display = 'block';
        // Iniciar countdown
        startCountdown();
        // Enfocar el campo de código
        document.getElementById('codigo').focus();
    }

    function startCountdown() {
        timeLeft = 180; // 3 minutos
        reenviarBtn.disabled = true;
        
        countdownTimer = setInterval(() => {
            timeLeft--;
            countdownSpan.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                reenviarBtn.disabled = false;
                reenviarBtn.innerHTML = 'Reenviar código';
            }
        }, 1000);
    }

    // Event Listeners

    // Login Form
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Deshabilitar el botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.textContent = 'Ingresando...';
        
        try {
            // Obtener los valores del formulario
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const remember = this.querySelector('input[name="remember"]').checked;
            
            // Validar que los campos no estén vacíos
            if (!email || !password) {
                showError('Por favor completa todos los campos', loginForm);
                return;
            }
            
            userEmail = email; // Guardar email para el OTP
            
            console.log('Enviando datos:', { email, password: '***', remember });
            
            // Enviar como JSON
            const response = await fetch('/api/auth/login', {
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
                // Login exitoso - ahora enviar OTP
                showSuccess('Credenciales correctas. Enviando código OTP...', loginForm);
                
                // Enviar OTP
                await sendOTP(email);
                
            } else {
                // Mostrar error
                showError(result.error || 'Error al iniciar sesión', loginForm);
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('Error de conexión. Por favor, intenta nuevamente.', loginForm);
        } finally {
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Función para enviar OTP
    async function sendOTP(email) {
        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (result.success) {
                showOTPSection();
                showSuccess('Código OTP enviado a tu correo', verificarForm);
            } else {
                showError(result.error || 'Error enviando código OTP', loginForm);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            showError('Error enviando código OTP', loginForm);
        }
    }

    // Verificar OTP Form
    verificarForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Deshabilitar el botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.textContent = 'Verificando...';
        
        try {
            const codigo = document.getElementById('codigo').value;
            
            if (!codigo || codigo.length !== 6) {
                showError('Por favor ingresa un código válido de 6 dígitos', verificarForm);
                return;
            }
            
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    code: codigo
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showSuccess('Código verificado correctamente. Redirigiendo...', verificarForm);
                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = result.redirectTo || '/inicio';
                }, 1500);
            } else {
                showError(result.error || 'Código incorrecto', verificarForm);
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('Error de conexión. Por favor, intenta nuevamente.', verificarForm);
        } finally {
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Reenviar OTP
    reenviarBtn.addEventListener('click', async function() {
        this.disabled = true;
        this.textContent = 'Enviando...';
        
        try {
            await sendOTP(userEmail);
            this.textContent = 'Código reenviado';
            setTimeout(() => {
                if (!this.disabled) {
                    this.innerHTML = 'Reenviar código (<span id="countdown">180</span>s)';
                }
            }, 2000);
        } catch (error) {
            this.disabled = false;
            this.textContent = 'Reenviar código';
            showError('Error reenviando código', verificarForm);
        }
    });

    // Volver al login
    volverBtn.addEventListener('click', function() {
        showLoginSection();
    });

    // Permitir solo números en el campo de código OTP
    document.getElementById('codigo').addEventListener('input', function(e) {
        // Remover cualquier carácter que no sea número
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limitar a 6 dígitos
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }
    });
});