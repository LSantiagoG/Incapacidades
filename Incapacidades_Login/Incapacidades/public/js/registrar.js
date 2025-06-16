
document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                if (file.type === 'application/pdf') {
                    this.style.borderColor = '#28a745';
                    this.style.backgroundColor = '#f8fff9';
                    
                    this.setAttribute('data-filename', file.name);
                } else {
                    this.style.borderColor = '#dc3545';
                    this.style.backgroundColor = '#fff5f5';
                    
                    this.value = '';
                    
                    alert('Solo se permiten archivos PDF');
                }
            } else {
                resetInputState(this);
            }
        });

        input.addEventListener('focus', function() {
            if (!this.files || this.files.length === 0) {
                this.style.borderColor = '#42A5F5';
                this.style.backgroundColor = 'white';
            }
        });

        input.addEventListener('blur', function() {
            if (!this.files || this.files.length === 0) {
                resetInputState(this);
            }
        });
    });

    function resetInputState(input) {
        input.style.borderColor = '#ddd';
        input.style.backgroundColor = 'white';
        input.removeAttribute('data-filename');
    }

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const requiredFiles = document.querySelectorAll('input[type="file"][required]');
        let allFilesValid = true;
        
        requiredFiles.forEach(input => {
            if (!input.files || input.files.length === 0) {
                allFilesValid = false;
                
                input.style.borderColor = '#dc3545';
                input.style.backgroundColor = '#fff5f5';
                
                if (allFilesValid !== false) {
                    input.focus();
                }
            }
        });
        
        if (allFilesValid) {
            console.log('Formulario válido, enviando...');
            
            const formData = new FormData(this);
            console.log('Datos del formulario:', Object.fromEntries(formData));
            

            alert('Formulario enviado correctamente'); 
        } else {
            alert('Por favor, completa todos los campos requeridos');
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        input[type="file"][data-filename]::before {
            content: "📄 " attr(data-filename);
            position: absolute;
            left: 2.5rem;
            top: 50%;
            transform: translateY(-50%);
            color: #28a745;
            font-size: 0.9rem;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});