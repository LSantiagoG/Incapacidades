// ====================================================
// LISTADO DE EMPRESAS - JavaScript Functions
// Archivo: scripts/listado-empresas.js
// ====================================================

// ====================================================
// DATOS DE PRUEBA
// ====================================================

const empresasPrueba = [
    {
        id: 1,
        nombre: "TechSolutions Colombia S.A.S",
        empleados: 245,
        departamento: "antioquia",
        municipio: "medellin",
        fechaRegistro: "2024-03-15",
        estado: "activa"
    },
    {
        id: 2,
        nombre: "Innovación Digital Ltda",
        empleados: 89,
        departamento: "bogota",
        municipio: "bogota",
        fechaRegistro: "2024-01-22",
        estado: "activa"
    },
    {
        id: 3,
        nombre: "Constructora del Valle S.A.",
        empleados: 156,
        departamento: "valle",
        municipio: "cali",
        fechaRegistro: "2023-11-08",
        estado: "activa"
    },
    {
        id: 4,
        nombre: "Servicios Logísticos del Norte",
        empleados: 78,
        departamento: "atlantico",
        municipio: "barranquilla",
        fechaRegistro: "2024-02-14",
        estado: "activa"
    },
    {
        id: 5,
        nombre: "Consultoría Empresarial S.A.S",
        empleados: 34,
        departamento: "santander",
        municipio: "bucaramanga",
        fechaRegistro: "2024-04-03",
        estado: "activa"
    },
    {
        id: 6,
        nombre: "Alimentos La Montaña Ltda",
        empleados: 312,
        departamento: "antioquia",
        municipio: "bello",
        fechaRegistro: "2023-09-12",
        estado: "activa"
    },
    {
        id: 7,
        nombre: "Textiles Modernos S.A.",
        empleados: 198,
        departamento: "antioquia",
        municipio: "itagui",
        fechaRegistro: "2024-01-18",
        estado: "activa"
    },
    {
        id: 8,
        nombre: "Grupo Financiero Capital",
        empleados: 423,
        departamento: "bogota",
        municipio: "bogota",
        fechaRegistro: "2023-12-05",
        estado: "activa"
    },
    {
        id: 9,
        nombre: "Energías Renovables del Sur",
        empleados: 67,
        departamento: "valle",
        municipio: "palmira",
        fechaRegistro: "2024-05-20",
        estado: "activa"
    },
    {
        id: 10,
        nombre: "Transporte Express Nacional",
        empleados: 134,
        departamento: "atlantico",
        municipio: "soledad",
        fechaRegistro: "2023-10-30",
        estado: "activa"
    },
    {
        id: 11,
        nombre: "Desarrollo Urbano S.A.S",
        empleados: 89,
        departamento: "santander",
        municipio: "floridablanca",
        fechaRegistro: "2024-03-08",
        estado: "activa"
    },
    {
        id: 12,
        nombre: "Comercializadora Internacional",
        empleados: 276,
        departamento: "antioquia",
        municipio: "envigado",
        fechaRegistro: "2023-08-17",
        estado: "activa"
    }
];

// Variables globales
let empresasFiltradas = [...empresasPrueba];
let paginaActual = 1;
const empresasPorPagina = 10;

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
}

// ====================================================
// FUNCIONES DE FILTROS
// ====================================================

/**
 * Cargar municipios basado en el departamento seleccionado
 */
function cargarMunicipiosFiltro(departamento) {
    const municipiosData = {
        'antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta'],
        'bogota': ['Bogotá D.C.'],
        'valle': ['Cali', 'Palmira', 'Buenaventura', 'Cartago', 'Buga'],
        'atlantico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'],
        'santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta']
    };
    
    const municipioSelect = document.getElementById('filtroMunicipio');
    municipioSelect.innerHTML = '<option value="">Todos los municipios</option>';
    
    if (municipiosData[departamento]) {
        municipiosData[departamento].forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.toLowerCase().replace(/\s+/g, '_');
            option.textContent = municipio;
            municipioSelect.appendChild(option);
        });
    }
}

/**
 * Aplicar filtros a la tabla
 */
function aplicarFiltros() {
    const filtroAnio = document.getElementById('filtroAnio').value;
    const filtroMes = document.getElementById('filtroMes').value;
    const filtroDepartamento = document.getElementById('filtroDepartamento').value;
    const filtroMunicipio = document.getElementById('filtroMunicipio').value;
    
    empresasFiltradas = empresasPrueba.filter(empresa => {
        const fechaRegistro = new Date(empresa.fechaRegistro);
        const anioEmpresa = fechaRegistro.getFullYear().toString();
        const mesEmpresa = (fechaRegistro.getMonth() + 1).toString().padStart(2, '0');
        
        // Filtrar por año
        if (filtroAnio && anioEmpresa !== filtroAnio) return false;
        
        // Filtrar por mes
        if (filtroMes && mesEmpresa !== filtroMes) return false;
        
        // Filtrar por departamento
        if (filtroDepartamento && empresa.departamento !== filtroDepartamento) return false;
        
        // Filtrar por municipio
        if (filtroMunicipio && empresa.municipio !== filtroMunicipio) return false;
        
        return true;
    });
    
    paginaActual = 1; // Resetear a la primera página
    cargarTablaEmpresas();
    actualizarPaginacion();
    
    console.log(`🔍 Filtros aplicados. Empresas encontradas: ${empresasFiltradas.length}`);
}

/**
 * Limpiar todos los filtros
 */
function limpiarFiltros() {
    document.getElementById('filtroAnio').value = '';
    document.getElementById('filtroMes').value = '';
    document.getElementById('filtroDepartamento').value = '';
    document.getElementById('filtroMunicipio').innerHTML = '<option value="">Todos los municipios</option>';
    
    empresasFiltradas = [...empresasPrueba];
    paginaActual = 1;
    cargarTablaEmpresas();
    actualizarPaginacion();
    
    console.log('🗑️ Filtros limpiados');
}

// ====================================================
// FUNCIONES DE TABLA
// ====================================================

/**
 * Cargar datos en la tabla de empresas
 */
function cargarTablaEmpresas() {
    const tbody = document.getElementById('tablaEmpresasBody');
    const inicio = (paginaActual - 1) * empresasPorPagina;
    const fin = inicio + empresasPorPagina;
    const empresasPagina = empresasFiltradas.slice(inicio, fin);
    
    tbody.innerHTML = '';
    
    if (empresasPagina.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; padding: 40px; color: #6b7280;">
                    📭 No se encontraron empresas con los filtros aplicados
                </td>
            </tr>
        `;
        return;
    }
    
    empresasPagina.forEach(empresa => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <div class="empresa-info">
                    <span class="empresa-nombre">${empresa.nombre}</span>
                    <small class="empresa-detalles">${obtenerNombreMunicipio(empresa.municipio)} - ${obtenerNombreDepartamento(empresa.departamento)}</small>
                </div>
            </td>
            <td>
                <span class="empleados-badge">${empresa.empleados.toLocaleString()} empleados</span>
            </td>
            <td>
                <div class="acciones-grupo">
                    <button class="btn-accion consultar" onclick="consultarEmpresa(${empresa.id})" title="Consultar">
                        👁️ Consultar
                    </button>
                    <button class="btn-accion editar" onclick="editarEmpresa(${empresa.id})" title="Editar">
                        ✏️ Editar
                    </button>
                    <button class="btn-accion eliminar" onclick="eliminarEmpresa(${empresa.id})" title="Eliminar">
                        🗑️ Eliminar
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * Obtener nombre legible del departamento
 */
function obtenerNombreDepartamento(codigo) {
    const departamentos = {
        'antioquia': 'Antioquia',
        'bogota': 'Bogotá D.C.',
        'valle': 'Valle del Cauca',
        'atlantico': 'Atlántico',
        'santander': 'Santander'
    };
    return departamentos[codigo] || codigo;
}

/**
 * Obtener nombre legible del municipio
 */
function obtenerNombreMunicipio(codigo) {
    const municipios = {
        'medellin': 'Medellín',
        'bello': 'Bello',
        'itagui': 'Itagüí',
        'envigado': 'Envigado',
        'bogota': 'Bogotá',
        'cali': 'Cali',
        'palmira': 'Palmira',
        'barranquilla': 'Barranquilla',
        'soledad': 'Soledad',
        'bucaramanga': 'Bucaramanga',
        'floridablanca': 'Floridablanca'
    };
    return municipios[codigo] || codigo;
}

// ====================================================
// FUNCIONES DE PAGINACIÓN
// ====================================================

/**
 * Actualizar controles de paginación
 */
function actualizarPaginacion() {
    const totalEmpresas = empresasFiltradas.length;
    const totalPaginas = Math.ceil(totalEmpresas / empresasPorPagina);
    const inicio = (paginaActual - 1) * empresasPorPagina + 1;
    const fin = Math.min(paginaActual * empresasPorPagina, totalEmpresas);
    
    // Actualizar información
    document.getElementById('paginacionInfo').textContent = 
        `Mostrando ${inicio}-${fin} de ${totalEmpresas} empresas`;
    
    // Actualizar botones
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas;
    
    // Actualizar números de página
    const numerosContainer = document.getElementById('numerosPaginacion');
    numerosContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPaginas; i++) {
        if (totalPaginas <= 5 || i <= 3 || i > totalPaginas - 3 || Math.abs(i - paginaActual) <= 1) {
            const boton = document.createElement('button');
            boton.className = `btn-page ${i === paginaActual ? 'active' : ''}`;
            boton.textContent = i;
            boton.onclick = () => irAPagina(i);
            numerosContainer.appendChild(boton);
        } else if (i === 4 && paginaActual > 5) {
            const puntos = document.createElement('span');
            puntos.textContent = '...';
            puntos.className = 'pagination-dots';
            numerosContainer.appendChild(puntos);
        }
    }
}

/**
 * Cambiar página
 */
function cambiarPagina(direccion) {
    const totalPaginas = Math.ceil(empresasFiltradas.length / empresasPorPagina);
    
    if (direccion === 'prev' && paginaActual > 1) {
        paginaActual--;
    } else if (direccion === 'next' && paginaActual < totalPaginas) {
        paginaActual++;
    }
    
    cargarTablaEmpresas();
    actualizarPaginacion();
}

/**
 * Ir a página específica
 */
function irAPagina(pagina) {
    paginaActual = pagina;
    cargarTablaEmpresas();
    actualizarPaginacion();
}

// ====================================================
// FUNCIONES DE ACCIONES
// ====================================================

/**
 * Consultar empresa
 */
function consultarEmpresa(id) {
    const empresa = empresasPrueba.find(e => e.id === id);
    if (empresa) {
        const modal = crearModalConsulta(empresa);
        document.body.appendChild(modal);
    }
}

/**
 * Editar empresa
 */
function editarEmpresa(id) {
    const empresa = empresasPrueba.find(e => e.id === id);
    if (empresa) {
        alert(`✏️ Redirigiendo a editar empresa: ${empresa.nombre}\n\n(En implementación real, iría a página de edición)`);
        console.log('Editando empresa:', empresa);
    }
}

/**
 * Eliminar empresa
 */
function eliminarEmpresa(id) {
    const empresa = empresasPrueba.find(e => e.id === id);
    if (empresa && confirm(`¿Está seguro de eliminar la empresa "${empresa.nombre}"?\n\nEsta acción no se puede deshacer.`)) {
        // Simular eliminación
        const index = empresasPrueba.findIndex(e => e.id === id);
        if (index > -1) {
            empresasPrueba.splice(index, 1);
            aplicarFiltros(); // Recargar tabla
            alert(`✅ Empresa "${empresa.nombre}" eliminada exitosamente`);
        }
    }
}

/**
 * Agregar nueva empresa
 */
function agregarEmpresa() {
    alert(`➕ Redirigiendo a formulario de nueva empresa\n\n(En implementación real, iría a página de creación)`);
    console.log('Agregando nueva empresa');
}

/**
 * Exportar a Excel
 */
function exportarExcel() {
    alert(`📊 Exportando ${empresasFiltradas.length} empresas a Excel\n\n(En implementación real, se generaría archivo Excel)`);
    console.log('Exportando datos:', empresasFiltradas);
}

/**
 * Crear modal de consulta
 */
function crearModalConsulta(empresa) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 1000; display: flex; 
        align-items: center; justify-content: center;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 24px; border-radius: 12px; 
        max-width: 600px; width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
            🏢 ${empresa.nombre}
        </h3>
        <div style="display: grid; gap: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; padding: 12px; background: #f9fafb; border-radius: 8px;">
                <span style="font-weight: 600; color: #374151;">👥 Número de Empleados:</span>
                <span style="color: #059669;">${empresa.empleados.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: #f9fafb; border-radius: 8px;">
                <span style="font-weight: 600; color: #374151;">📍 Ubicación:</span>
                <span>${obtenerNombreMunicipio(empresa.municipio)}, ${obtenerNombreDepartamento(empresa.departamento)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: #f9fafb; border-radius: 8px;">
                <span style="font-weight: 600; color: #374151;">📅 Fecha de Registro:</span>
                <span>${new Date(empresa.fechaRegistro).toLocaleDateString('es-CO')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px; background: #f9fafb; border-radius: 8px;">
                <span style="font-weight: 600; color: #374151;">📊 Estado:</span>
            </div>
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button id="cerrarModal" style="padding: 10px 20px; border: 1px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">
                Cerrar
            </button>
            <button onclick="editarEmpresa(${empresa.id}); this.closest('div[style*=\"position: fixed\"]').remove();" 
                    style="padding: 10px 20px; border: none; background: #3b82f6; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">
                ✏️ Editar Empresa
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // Event listener para cerrar
    const cerrarBtn = modalContent.querySelector('#cerrarModal');
    cerrarBtn.addEventListener('click', () => modal.remove());
    
    // Cerrar al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// ====================================================
// INICIALIZACIÓN
// ====================================================

/**
 * Inicialización cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando listado de empresas (Administrador)...');
    
    // Cargar tema guardado
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.documentElement.classList.add('dark');
        const toggleBtn = document.querySelector('.dark-mode-toggle');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    }
    
    // Expandir menú de empresa por defecto
    const empresaMenu = document.querySelector('.nav-item');
    const empresaSubmenu = empresaMenu?.nextElementSibling;
    if (empresaMenu && empresaSubmenu) {
        empresaMenu.classList.add('expanded');
        empresaSubmenu.classList.add('open');
    }
    
    // Event listener para filtro de departamento
    document.getElementById('filtroDepartamento').addEventListener('change', function() {
        cargarMunicipiosFiltro(this.value);
    });
    
    // Cargar tabla inicial
    cargarTablaEmpresas();
    actualizarPaginacion();
    
    // Auto-aplicar filtros cuando cambien
    const filtros = ['filtroAnio', 'filtroMes', 'filtroDepartamento', 'filtroMunicipio'];
    filtros.forEach(filtroId => {
        document.getElementById(filtroId).addEventListener('change', aplicarFiltros);
    });
    
    console.log(`✅ Listado cargado con ${empresasPrueba.length} empresas`);
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

// ====================================================
// EXPONER FUNCIONES GLOBALMENTE
// ====================================================

window.toggleSidebar = toggleSidebar;
window.toggleDropdown = toggleDropdown;
window.toggleDarkMode = toggleDarkMode;
window.aplicarFiltros = aplicarFiltros;
window.limpiarFiltros = limpiarFiltros;
window.cambiarPagina = cambiarPagina;
window.irAPagina = irAPagina;
window.consultarEmpresa = consultarEmpresa;
window.editarEmpresa = editarEmpresa;
window.eliminarEmpresa = eliminarEmpresa;
window.agregarEmpresa = agregarEmpresa;
window.exportarExcel = exportarExcel;