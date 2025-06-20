document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Deshabilitar el botón y mostrar estado de carga
        submitButton.disabled = true;
        submitButton.textContent = 'Ingresando...';
        
        try {
            // Obtener los valores del formulario
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            const remember = loginForm.querySelector('input[name="remember"]').checked;
            
            // Validar que los campos no estén vacíos
            if (!email || !password) {
                showError('Por favor completa todos los campos');
                return;
            }
            
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
                // Login exitoso - redirigir
                window.location.href = result.redirectTo || '/inicio';
            } else {
                // Mostrar error
                showError(result.error || 'Error al iniciar sesión');
            }
            
        } catch (error) {
            console.error('Error:', error);
            showError('Error de conexión. Por favor, intenta nuevamente.');
        } finally {
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    
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
});