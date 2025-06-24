// ====================================================
// USER INFO FORM - JavaScript Functions
// Archivo: scripts/user-info.js
// ====================================================

// ====================================================
// DATOS DE PRUEBA
// ====================================================

const datosEmpresaPrueba = {
    razonSocial: "TechSolutions Colombia S.A.S",
    tipoDocumento: "nit",
    numeroNIT: "9001234567",
    digitoVerificacion: "8",
    departamento: "antioquia",
    municipio: "medellin",
    direccionEmpresa: "Carrera 43A #12-34, Edificio Empresarial Torre Norte, Piso 15",
    
    // Representante Legal
    nombreRepresentante: "María Elena Rodríguez García",
    tipoDocumentoRepresentante: "cc",
    numeroDocumentoRepresentante: "43789456",
    telefonoRepresentante: "+57 300 123 4567",
    emailRepresentante: "maria.rodriguez@techsolutions.com.co",
    
    // Persona Autorizada
    nombreAutorizada: "Carlos Andrés Martínez López",
    tipoDocumentoAutorizada: "cc",
    numeroDocumentoAutorizada: "71234789",
    telefonoAutorizada: "+57 315 987 6543",
    emailAutorizada: "carlos.martinez@techsolutions.com.co"
};

/**
 * Cargar datos de prueba en el formulario
 */
function cargarDatosPrueba() {
    console.log('📝 Cargando datos de prueba...');
    
    // Llenar campos por selector específico para evitar conflictos
    setTimeout(() => {
        // 1. Información de la empresa
        const empresaSection = Array.from(document.querySelectorAll('.section-title'))
            .find(title => title.textContent.includes('Información de la Empresa'))?.closest('.form-section');
        
        if (empresaSection) {
            // Razón social
            const razonSocialInput = empresaSection.querySelector('input[placeholder*="razón social"]');
            if (razonSocialInput) razonSocialInput.value = datosEmpresaPrueba.razonSocial;
            
            // Tipo de documento empresa
            const tipoDocEmpresaSelect = empresaSection.querySelector('select');
            if (tipoDocEmpresaSelect) {
                tipoDocEmpresaSelect.value = datosEmpresaPrueba.tipoDocumento;
                tipoDocEmpresaSelect.dispatchEvent(new Event('change'));
            }
            
            // NIT
            const nitInput = empresaSection.querySelector('input[placeholder*="NIT"]');
            if (nitInput) nitInput.value = datosEmpresaPrueba.numeroNIT;
            
            // Dígito verificación
            const digitoInput = empresaSection.querySelector('input[maxlength="1"]');
            if (digitoInput) digitoInput.value = datosEmpresaPrueba.digitoVerificacion;
            
            // Departamento
            const departamentoSelect = empresaSection.querySelector('select[class*="form-select"]:not(:first-child)');
            const allSelects = empresaSection.querySelectorAll('select');
            let deptoSelect = null;
            allSelects.forEach(select => {
                const label = select.closest('.form-group')?.querySelector('.form-label')?.textContent;
                if (label && label.includes('Departamento')) {
                    deptoSelect = select;
                }
            });
            
            if (deptoSelect) {
                deptoSelect.value = datosEmpresaPrueba.departamento;
                deptoSelect.dispatchEvent(new Event('change'));
                
                // Municipio después de cargar departamento
                setTimeout(() => {
                    let municipioSelect = null;
                    allSelects.forEach(select => {
                        const label = select.closest('.form-group')?.querySelector('.form-label')?.textContent;
                        if (label && label.includes('Municipio')) {
                            municipioSelect = select;
                        }
                    });
                    
                    if (municipioSelect) {
                        municipioSelect.value = datosEmpresaPrueba.municipio;
                        municipioSelect.dispatchEvent(new Event('change'));
                    }
                }, 300);
            }
            
            // Dirección
            const direccionInput = empresaSection.querySelector('input[placeholder*="dirección completa"]');
            if (direccionInput) direccionInput.value = datosEmpresaPrueba.direccionEmpresa;
        }
        
        // 2. Llenar sección representante legal
        llenarCamposRepresentante();
        
        // 3. Llenar sección persona autorizada  
        llenarCamposAutorizada();
        
    }, 200);

    console.log('✅ Datos de prueba cargados');
}

/**
 * Llenar campos del representante legal
 */
function llenarCamposRepresentante() {
    const representanteSection = Array.from(document.querySelectorAll('.section-title'))
        .find(title => title.textContent.includes('Representante Legal'))?.closest('.form-section');
    
    if (representanteSection) {
        const nombreInput = representanteSection.querySelector('input[placeholder*="Nombre completo"]');
        const documentoInput = representanteSection.querySelector('input[placeholder*="identificación"]');
        const telefonoInput = representanteSection.querySelector('input[type="tel"]');
        const emailInput = representanteSection.querySelector('input[type="email"]');
        
        // Tipo de documento representante
        const tipoDocSelect = representanteSection.querySelector('select');
        
        if (nombreInput) nombreInput.value = datosEmpresaPrueba.nombreRepresentante;
        if (tipoDocSelect) {
            tipoDocSelect.value = datosEmpresaPrueba.tipoDocumentoRepresentante;
            tipoDocSelect.dispatchEvent(new Event('change'));
        }
        if (documentoInput) documentoInput.value = datosEmpresaPrueba.numeroDocumentoRepresentante;
        if (telefonoInput) telefonoInput.value = datosEmpresaPrueba.telefonoRepresentante;
        if (emailInput) emailInput.value = datosEmpresaPrueba.emailRepresentante;
        
        console.log('✅ Datos del representante legal cargados');
    }
}

/**
 * Llenar campos de la persona autorizada
 */
function llenarCamposAutorizada() {
    const autorizadaSection = Array.from(document.querySelectorAll('.section-title'))
        .find(title => title.textContent.includes('Persona Autorizada'))?.closest('.form-section');
    
    if (autorizadaSection) {
        const nombreInput = autorizadaSection.querySelector('input[placeholder*="Nombre completo"]');
        const documentoInput = autorizadaSection.querySelector('input[placeholder*="identificación"]');
        const telefonoInput = autorizadaSection.querySelector('input[type="tel"]');
        const emailInput = autorizadaSection.querySelector('input[type="email"]');
        
        // Tipo de documento autorizada
        const tipoDocSelect = autorizadaSection.querySelector('select');
        
        if (nombreInput) nombreInput.value = datosEmpresaPrueba.nombreAutorizada;
        if (tipoDocSelect) {
            tipoDocSelect.value = datosEmpresaPrueba.tipoDocumentoAutorizada;
            tipoDocSelect.dispatchEvent(new Event('change'));
        }
        if (documentoInput) documentoInput.value = datosEmpresaPrueba.numeroDocumentoAutorizada;
        if (telefonoInput) telefonoInput.value = datosEmpresaPrueba.telefonoAutorizada;
        if (emailInput) emailInput.value = datosEmpresaPrueba.emailAutorizada;
        
        console.log('✅ Datos de la persona autorizada cargados');
    }
}

// ====================================================
// FUNCIONES PRINCIPALES
// ====================================================

/**
 * Función para toggle del sidebar
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    
    sidebar.classList.toggle('show');
    sidebar.classList.toggle('hidden');
    overlay.classList.toggle('show');
    mainContent.classList.toggle('sidebar-hidden');
}

/**
 * Función para toggle del dropdown en el sidebar
 */
function toggleDropdown(element) {
    const submenu = element.nextElementSibling;
    const chevron = element.querySelector('.chevron');
    
    element.classList.toggle('expanded');
    submenu.classList.toggle('open');
}

/**
 * Función para modo oscuro
 */
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
    }
    
    console.log(`Modo oscuro: ${isDark ? 'Activado' : 'Desactivado'}`);
}

/**
 * Función para guardar información de la empresa
 */
function saveUserInfo() {
    // Recopilar todos los datos del formulario
    const datosFormulario = recopilarDatosFormulario();
    
    // Validar campos requeridos
    const requiredFields = document.querySelectorAll('.form-input, .form-select');
    const emptyFields = [];
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            const label = field.closest('.form-group')?.querySelector('.form-label')?.textContent || 'Campo sin nombre';
            emptyFields.push(label);
            field.style.borderColor = '#ef4444';
        } else {
            field.style.borderColor = '#22c55e';
        }
    });

    if (emptyFields.length > 0) {
        alert(`Por favor complete los siguientes campos:\n\n• ${emptyFields.join('\n• ')}`);
        return;
    }

    // Simular guardado
    const saveBtn = document.querySelector('.btn-primary');
    const originalText = saveBtn.innerHTML;
    
    saveBtn.innerHTML = '⏳ Guardando...';
    saveBtn.setAttribute('disabled', 'true');
    
    setTimeout(() => {
        // Guardar en localStorage para persistencia
        localStorage.setItem('datosEmpresa', JSON.stringify(datosFormulario));
        
        saveBtn.innerHTML = '✅ Guardado';
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.removeAttribute('disabled');
        }, 1500);
        
        alert('✅ Información de la empresa guardada exitosamente');
        console.log('Datos guardados:', datosFormulario);
    }, 2000);
}

/**
 * Recopilar todos los datos del formulario
 */
function recopilarDatosFormulario() {
    const datos = {};
    
    // Recopilar inputs de texto
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        if (input.value.trim()) {
            const key = generarKeyUnica(input);
            datos[key] = input.value.trim();
        }
    });
    
    // Recopilar selects específicamente
    const formSelects = document.querySelectorAll('.form-select');
    formSelects.forEach(select => {
        if (select.value) {
            const key = generarKeyUnica(select);
            datos[key] = select.value;
            
            // Debug para ver qué se está guardando
            console.log(`Guardando select: ${key} = ${select.value}`);
        }
    });
    
    console.log('📊 Datos recopilados para guardar:', datos);
    return datos;
}

/**
 * Generar key única basada en la sección del formulario
 */
function generarKeyUnica(element) {
    const formGroup = element.closest('.form-group');
    const formSection = element.closest('.form-section');
    const label = formGroup?.querySelector('.form-label')?.textContent || element.placeholder || 'campo';
    
    // Identificar la sección
    let seccion = '';
    if (formSection) {
        const sectionTitle = formSection.querySelector('.section-title')?.textContent || '';
        if (sectionTitle.includes('Información de la Empresa')) {
            seccion = 'empresa_';
        } else if (sectionTitle.includes('Representante Legal')) {
            seccion = 'representante_';
        } else if (sectionTitle.includes('Persona Autorizada')) {
            seccion = 'autorizada_';
        }
    }
    
    // Crear key única
    const baseKey = label.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/\s+/g, '_');
    return seccion + baseKey;
}

/**
 * Cargar datos guardados del localStorage
 */
function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosEmpresa');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            console.log('📄 Cargando datos guardados:', datos);
            
            // Cargar inputs de texto
            const formInputs = document.querySelectorAll('.form-input');
            formInputs.forEach(input => {
                const key = generarKeyUnica(input);
                
                if (datos[key]) {
                    input.value = datos[key];
                    console.log(`Cargando input: ${key} = ${datos[key]}`);
                }
            });
            
            // Cargar selects con timeout para asegurar que estén renderizados
            setTimeout(() => {
                const formSelects = document.querySelectorAll('.form-select');
                formSelects.forEach(select => {
                    const key = generarKeyUnica(select);
                    
                    if (datos[key]) {
                        select.value = datos[key];
                        console.log(`Cargando select: ${key} = ${datos[key]}`);
                        
                        // Si es departamento, cargar municipios
                        if (key.includes('departamento')) {
                            setTimeout(() => {
                                loadMunicipalities(select);
                                
                                // Cargar municipio después de cargar la lista
                                setTimeout(() => {
                                    const municipioKey = 'empresa_municipio';
                                    if (datos[municipioKey]) {
                                        const municipioSelect = Array.from(document.querySelectorAll('.form-select'))
                                            .find(s => generarKeyUnica(s) === municipioKey);
                                        if (municipioSelect) {
                                            municipioSelect.value = datos[municipioKey];
                                            console.log(`Cargando municipio: ${datos[municipioKey]}`);
                                        }
                                    }
                                }, 200);
                            }, 100);
                        }
                        
                        select.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            }, 100);
            
            return true;
        } catch (error) {
            console.error('Error cargando datos guardados:', error);
        }
    }
    return false;
}

/**
 * Limpiar datos guardados
 */
function limpiarDatos() {
    if (confirm('¿Está seguro de que desea limpiar todos los datos del formulario?')) {
        localStorage.removeItem('datosEmpresa');
        
        // Limpiar inputs de texto
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.value = '';
            input.style.borderColor = '#d1d5db';
        });
        
        // Limpiar selects
        const formSelects = document.querySelectorAll('.form-select');
        formSelects.forEach(select => {
            select.selectedIndex = 0; // Seleccionar primera opción (vacía)
            select.style.borderColor = '#d1d5db';
        });
        
        // Limpiar municipios cuando se limpie departamento
        setTimeout(() => {
            const municipioSelects = Array.from(document.querySelectorAll('.form-select'))
                .filter(select => {
                    const label = select.closest('.form-group')?.querySelector('.form-label')?.textContent;
                    return label && label.includes('Municipio');
                });
            
            municipioSelects.forEach(select => {
                select.innerHTML = '<option value="">Seleccione...</option>';
            });
        }, 100);
        
        alert('✅ Datos limpiados exitosamente');
        console.log('🗑️ Formulario limpiado completamente');
        
        // Cargar datos de prueba después de limpiar
        setTimeout(() => {
            cargarDatosPrueba();
        }, 200);
    }
}

// ====================================================
// FUNCIONES DE DOCUMENTOS
// ====================================================

/**
 * Función para subir documentos
 */
function uploadDocument(documentType) {
    // Crear input file dinámicamente
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.multiple = false;
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 5MB permitido.');
                return;
            }
            
            // Encontrar el documento por nombre
            const documentItem = Array.from(document.querySelectorAll('.document-name'))
                .find(el => el.textContent === documentType)?.closest('.document-item');
            
            if (!documentItem) {
                console.error('No se encontró el documento:', documentType);
                return;
            }
            
            const statusElement = documentItem.querySelector('.document-status');
            const actionsElement = documentItem.querySelector('.document-actions');
            
            // Cambiar estado a "subiendo"
            statusElement.textContent = 'Subiendo...';
            statusElement.className = 'document-status';
            statusElement.style.background = '#fef3c7';
            statusElement.style.color = '#92400e';
            
            setTimeout(() => {
                // Cambiar a "subido"
                statusElement.textContent = 'Subido';
                statusElement.className = 'document-status uploaded';
                statusElement.style.background = '';
                statusElement.style.color = '';
                
                // Actualizar botones para mostrar Ver y Actualizar
                actionsElement.innerHTML = `
                    <button class="btn-document view" onclick="viewDocument('${documentType}')">👁️ Ver</button>
                    <button class="btn-document upload" onclick="uploadDocument('${documentType}')">📎 Actualizar</button>
                `;
                
                alert(`✅ Documento "${documentType}" subido exitosamente`);
                console.log(`Documento subido: ${documentType} - ${file.name}`);
            }, 2000);
        }
    };
    
    input.click();
}

/**
 * Función para ver documentos
 */
function viewDocument(documentType) {
    // Crear modal para vista de documento
    const modal = createDocumentModal(documentType);
    document.body.appendChild(modal);
    console.log(`Abriendo documento: ${documentType}`);
}

/**
 * Crear modal para vista de documento
 */
function createDocumentModal(documentType) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 24px; border-radius: 12px; 
        max-width: 500px; width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px; font-weight: 600;">📄 ${documentType}</h3>
        <div style="background: #f3f4f6; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 16px;">
            <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">Vista previa del documento</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">Archivo: ${documentType.toLowerCase().replace(/\s+/g, '_')}.pdf</p>
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="closeModalBtn" style="padding: 10px 20px; border: 1px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">
                Cerrar
            </button>
            <button id="downloadModalBtn" style="padding: 10px 20px; border: none; background: #3b82f6; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">
                💾 Descargar
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // Event listeners para los botones
    const closeBtn = modalContent.querySelector('#closeModalBtn');
    const downloadBtn = modalContent.querySelector('#downloadModalBtn');
    
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    downloadBtn.addEventListener('click', function() {
        downloadDocument(documentType);
        modal.remove();
    });
    
    // Cerrar al hacer clic en el fondo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

/**
 * Función para simular descarga de documentos
 */
function downloadDocument(documentType) {
    alert(`📥 Descargando "${documentType}"...\n\nEn una implementación real, aquí se descargaría el archivo.`);
    console.log(`Descarga simulada: ${documentType}`);
}

// ====================================================
// FUNCIONES DE VALIDACIÓN
// ====================================================

/**
 * Cargar municipios basado en el departamento seleccionado
 */
function loadMunicipalities(departmentSelect) {
    const municipiosData = {
        'antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta', 'Copacabana', 'La Estrella'],
        'bogota': ['Bogotá D.C.'],
        'valle': ['Cali', 'Palmira', 'Buenaventura', 'Cartago', 'Buga', 'Tuluá', 'Jamundí'],
        'atlantico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia', 'Galapa'],
        'santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja']
    };
    
    try {
        const departmentValue = departmentSelect.value;
        const formGrid = departmentSelect.closest('.form-grid');
        
        if (!formGrid) {
            console.warn('No se encontró form-grid');
            return;
        }
        
        // Buscar el select de municipio en el mismo form-grid
        let municipioSelect = null;
        const allSelects = formGrid.querySelectorAll('select');
        
        allSelects.forEach(select => {
            const formGroup = select.closest('.form-group');
            if (formGroup) {
                const label = formGroup.querySelector('.form-label');
                if (label && label.textContent && label.textContent.includes('Municipio')) {
                    municipioSelect = select;
                }
            }
        });
        
        if (municipioSelect) {
            municipioSelect.innerHTML = '<option value="">Seleccione...</option>';
            
            if (municipiosData[departmentValue]) {
                municipiosData[departmentValue].forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio.toLowerCase().replace(/\s+/g, '_');
                    option.textContent = municipio;
                    municipioSelect.appendChild(option);
                });
                
                console.log(`✅ Municipios cargados para ${departmentValue}:`, municipiosData[departmentValue].length);
            }
        } else {
            console.warn('No se encontró el select de municipio en el form-grid');
        }
    } catch (error) {
        console.error('Error en loadMunicipalities:', error);
    }
}

/**
 * Validación en tiempo real de campos
 */
function setupFieldValidation() {
    const fields = document.querySelectorAll('.form-input, .form-select');
    
    fields.forEach(field => {
        // Validación al perder el foco
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Validación específica por tipo
        if (field.type === 'email') {
            field.addEventListener('input', function() {
                validateEmail(this);
            });
        }
        
        if (field.placeholder && field.placeholder.includes('NIT')) {
            field.addEventListener('input', function() {
                validateNIT(this);
            });
        }
    });
}

/**
 * Validar campo individual
 */
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.closest('.form-group')?.querySelector('.form-label.required');
    
    if (isRequired && !value) {
        field.style.borderColor = '#ef4444';
        return false;
    } else if (value) {
        field.style.borderColor = '#22c55e';
        return true;
    } else {
        field.style.borderColor = '#d1d5db';
        return true;
    }
}

/**
 * Validar email
 */
function validateEmail(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(field.value);
    
    field.style.borderColor = isValid ? '#22c55e' : '#ef4444';
    return isValid;
}

/**
 * Validar NIT
 */
function validateNIT(field) {
    const nitRegex = /^\d{9,11}$/;
    const isValid = nitRegex.test(field.value.replace(/[^\d]/g, ''));
    
    field.style.borderColor = isValid ? '#22c55e' : '#ef4444';
    return isValid;
}

// ====================================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ====================================================

/**
 * Inicialización cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando formulario de empresa...');
    
    // Cargar preferencias guardadas
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.documentElement.classList.add('dark');
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    }
    
    // Expandir el menú de empresa por defecto
    const empresaMenu = document.querySelector('.nav-item');
    const empresaSubmenu = empresaMenu?.nextElementSibling;
    if (empresaMenu && empresaSubmenu) {
        empresaMenu.classList.add('expanded');
        empresaSubmenu.classList.add('open');
    }
    
    // Configurar validación de campos
    setupFieldValidation();
    
    // Event listeners para departamentos
    const departmentSelects = document.querySelectorAll('select');
    departmentSelects.forEach(select => {
        const label = select.closest('.form-group')?.querySelector('.form-label')?.textContent;
        if (label && label.includes('Departamento')) {
            select.addEventListener('change', function() {
                loadMunicipalities(this);
            });
        }
    });
    
    // Event listeners para botones de documentos
    document.querySelectorAll('.btn-document.upload').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const documentName = this.closest('.document-item').querySelector('.document-name').textContent;
            uploadDocument(documentName);
        });
    });
    
    // Event listeners para botones de ver (si existen)
    document.querySelectorAll('.btn-document.view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const documentName = this.closest('.document-item').querySelector('.document-name').textContent;
            viewDocument(documentName);
        });
    });
    
    // Limpiar datos antiguos incompatibles y cargar datos de prueba
    setTimeout(() => {
        // Verificar si hay datos guardados con el nuevo formato
        const datosGuardados = localStorage.getItem('datosEmpresa');
        let tieneFormatoNuevo = false;
        
        if (datosGuardados) {
            try {
                const datos = JSON.parse(datosGuardados);
                // Verificar si tiene el nuevo formato con prefijos
                tieneFormatoNuevo = Object.keys(datos).some(key => 
                    key.startsWith('empresa_') || key.startsWith('representante_') || key.startsWith('autorizada_')
                );
            } catch (error) {
                console.warn('Error verificando formato de datos:', error);
            }
        }
        
        if (tieneFormatoNuevo) {
            console.log('📄 Cargando datos guardados con formato nuevo...');
            cargarDatosGuardados();
        } else {
            console.log('📝 No hay datos compatibles, cargando datos de prueba...');
            // Limpiar datos antiguos incompatibles
            localStorage.removeItem('datosEmpresa');
            cargarDatosPrueba();
        }
    }, 500);
    
    console.log('✅ Formulario de empresa inicializado correctamente');
});

/**
 * Responsive sidebar para móviles
 */
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        if (mainContent) mainContent.classList.remove('sidebar-hidden');
    }
});

/**
 * Función de debug para mostrar datos guardados
 */
function mostrarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosEmpresa');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        console.table(datos);
        alert('📋 Datos guardados (ver consola para detalles):\n\n' + 
              Object.keys(datos).map(key => `${key}: ${datos[key]}`).join('\n'));
    } else {
        alert('❌ No hay datos guardados en localStorage');
    }
}

// ====================================================
// EXPONER FUNCIONES GLOBALMENTE
// ====================================================

window.toggleSidebar = toggleSidebar;
window.toggleDropdown = toggleDropdown;
window.toggleDarkMode = toggleDarkMode;
window.saveUserInfo = saveUserInfo;
window.uploadDocument = uploadDocument;
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.cargarDatosPrueba = cargarDatosPrueba;
window.limpiarDatos = limpiarDatos;
window.mostrarDatosGuardados = mostrarDatosGuardados;