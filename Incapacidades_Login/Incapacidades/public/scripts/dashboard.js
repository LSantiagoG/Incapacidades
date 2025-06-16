// Datos simulados para diferentes años/meses
const dataByPeriod = {
    2025: {
        all: { // Todos los meses - datos agregados
            stats: { pagadas: 1023248, negadas: 3893856, pendientes: 31083396, total: 36000500 },
            nomina: [723248, 300000],
            administradora: [865000, 158000],
            saldos: [9627487, 10831968, 9651606, 4302738, 2586201]
        },
        1: { // Enero
            stats: { pagadas: 280000, negadas: 1100000, pendientes: 8900000, total: 10280000 },
            nomina: [280000, 0],
            administradora: [250000, 25000],
            saldos: [2800000, 2900000, 2750000, 1200000, 800000]
        },
        5: { // Mayo
            stats: { pagadas: 333124, negadas: 1271928, pendientes: 10135694, total: 11740746 },
            nomina: [333124, 0],
            administradora: [295000, 31000],
            saldos: [3227487, 3331968, 3151606, 1402738, 902261]
        },
        6: { // Junio
            stats: { pagadas: 410000, negadas: 1350000, pendientes: 10800000, total: 12560000 },
            nomina: [0, 410000],
            administradora: [320000, 35000],
            saldos: [3400000, 3500000, 3300000, 1500000, 950000]
        }
    },
    2024: {
        all: { // Todos los meses 2024
            stats: { pagadas: 847000, negadas: 3420000, pendientes: 28733000, total: 33000000 },
            nomina: [565000, 282000],
            administradora: [798000, 132000],
            saldos: [8150000, 9350000, 8050000, 3700000, 2250000]
        },
        5: { // Mayo 2024
            stats: { pagadas: 290000, negadas: 1150000, pendientes: 9200000, total: 10640000 },
            nomina: [290000, 0],
            administradora: [270000, 28000],
            saldos: [3000000, 3100000, 2950000, 1300000, 850000]
        },
        6: { // Junio 2024
            stats: { pagadas: 375000, negadas: 1220000, pendientes: 9800000, total: 11395000 },
            nomina: [0, 375000],
            administradora: [300000, 32000],
            saldos: [3150000, 3250000, 3100000, 1400000, 900000]
        }
    }
};

let charts = {};

// Configuración común para todos los gráficos
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
Chart.defaults.color = '#6b7280';

function initializeCharts() {
    // Gráfico de Nómina vs Administradora
    const nominaCtx = document.getElementById('nominaChart').getContext('2d');
    charts.nomina = new Chart(nominaCtx, {
        type: 'bar',
        data: {
            labels: ['Mayo', 'Junio'],
            datasets: [{
                label: 'Pagado por Nómina',
                data: [333124, 0],
                backgroundColor: 'rgba(244, 63, 94, 0.8)',
                borderColor: 'rgba(244, 63, 94, 1)',
                borderWidth: 1,
                borderRadius: 4
            }, {
                label: 'Pagado por Administradora',
                data: [295000, 31000],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();

                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Gráfico Circular de Pagos por Entidades
    const entidadesCtx = document.getElementById('entidadesChart').getContext('2d');
    charts.entidades = new Chart(entidadesCtx, {
        type: 'pie',
        data: {
            labels: ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'],
            datasets: [{
                data: [35, 28, 20, 12, 5],
                backgroundColor: [
                    'rgba(244, 63, 94, 0.8)',   // ARL SURA
                    'rgba(16, 185, 129, 0.8)',  // MUTUAL SER
                    'rgba(59, 130, 246, 0.8)',  // CAFAM SALUD
                    'rgba(245, 158, 11, 0.8)',  // ASSIST SALUD
                    'rgba(168, 85, 247, 0.8)'   // FAMISANAR
                ],
                borderColor: [
                    'rgba(244, 63, 94, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(168, 85, 247, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });

    // Gráfico de Saldo por Entidades
    const saldoCtx = document.getElementById('saldoChart').getContext('2d');
    charts.saldo = new Chart(saldoCtx, {
        type: 'bar',
        data: {
            labels: ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'],
            datasets: [{
                label: 'Saldo ($)',
                data: [3227487, 3331968, 3151606, 1402738, 902261],
                backgroundColor: [
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)'
                ],
                borderColor: [
                    'rgba(244, 63, 94, 1)',
                    'rgba(244, 63, 94, 1)',
                    'rgba(244, 63, 94, 1)',
                    'rgba(244, 63, 94, 1)',
                    'rgba(244, 63, 94, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();

                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Gráfico de Estadísticas Generales
    const estadisticasCtx = document.getElementById('estadisticasChart').getContext('2d');
    charts.estadisticas = new Chart(estadisticasCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pagadas (3%)', 'Negadas (11%)', 'Pendientes (86%)'],
            datasets: [{
                data: [333124, 1271928, 10135694],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(244, 63, 94, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// Aplicar filtros (ahora automático al cambiar)
function applyFilters() {
    const year = document.getElementById('yearFilter').value;
    const month = document.getElementById('monthFilter').value;
    const entity = document.getElementById('entityFilter').value;

    // Obtener datos para el período seleccionado
    let data;
    if (month === 'all') {
        data = dataByPeriod[year]?.['all'] || dataByPeriod[2025]['all'];
    } else {
        data = dataByPeriod[year]?.[parseInt(month)] || dataByPeriod[2025]['all'];
    }

    // Actualizar stats cards
    updateStatsCards(data.stats);

    // Actualizar gráficos
    updateCharts(data, month, entity);

    // Actualizar título
    const selectedYear = year;
    const selectedMonth = month === 'all' ? 'Todos los meses' : getMonthName(parseInt(month));
    document.querySelector('.header h1').textContent = 
        `Incapacidades Nómina vs Pagos Recibidos - ${selectedMonth} ${selectedYear}`;
}

// Aplicar filtros automáticamente al cambiar selects
function setupFilterListeners() {
    document.getElementById('yearFilter').addEventListener('change', applyFilters);
    document.getElementById('monthFilter').addEventListener('change', applyFilters);
    document.getElementById('entityFilter').addEventListener('change', applyFilters);
}

function updateStatsCards(stats) {
    document.querySelector('.stat-card:nth-child(1) .value').textContent = stats.pagadas.toLocaleString();
    document.querySelector('.stat-card:nth-child(2) .value').textContent = stats.negadas.toLocaleString();
    document.querySelector('.stat-card:nth-child(3) .value').textContent = stats.pendientes.toLocaleString();
    document.querySelector('.stat-card:nth-child(4) .value').textContent = stats.total.toLocaleString();


    // Actualizar porcentajes
    const pagadasPct = ((stats.pagadas / stats.total) * 100).toFixed(1);
    const negadasPct = ((stats.negadas / stats.total) * 100).toFixed(1);
    const pendientesPct = ((stats.pendientes / stats.total) * 100).toFixed(1);

    document.querySelector('.stat-card:nth-child(1) .change').textContent = `${pagadasPct}% del total`;
    document.querySelector('.stat-card:nth-child(2) .change').textContent = `${negadasPct}% del total`;
    document.querySelector('.stat-card:nth-child(3) .change').textContent = `${pendientesPct}% del total`;
}

function updateCharts(data, month, entity) {
    // Actualizar gráfico de nómina vs administradora
    charts.nomina.data.datasets[0].data = data.nomina;
    charts.nomina.data.datasets[1].data = data.administradora;
    charts.nomina.update();

    // Actualizar gráfico circular de entidades
    let entidadesData, entidadesLabels, entidadesColors, entidadesBorderColors;
    
    if (entity !== 'all') {
        // Mostrar solo la entidad seleccionada
        entidadesData = [100];
        entidadesLabels = [getEntityName(entity)];
        entidadesColors = [getEntityColor(entity)];
        entidadesBorderColors = [getEntityBorderColor(entity)];
    } else {
        // Mostrar todas las entidades con distribución porcentual
        entidadesData = [35, 28, 20, 12, 5]; // Porcentajes de distribución
        entidadesLabels = ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'];
        entidadesColors = [
            'rgba(244, 63, 94, 0.8)',   // ARL SURA
            'rgba(16, 185, 129, 0.8)',  // MUTUAL SER
            'rgba(59, 130, 246, 0.8)',  // CAFAM SALUD
            'rgba(245, 158, 11, 0.8)',  // ASSIST SALUD
            'rgba(168, 85, 247, 0.8)'   // FAMISANAR
        ];
        entidadesBorderColors = [
            'rgba(244, 63, 94, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(168, 85, 247, 1)'
        ];
    }

    charts.entidades.data.labels = entidadesLabels;
    charts.entidades.data.datasets[0].data = entidadesData;
    charts.entidades.data.datasets[0].backgroundColor = entidadesColors;
    charts.entidades.data.datasets[0].borderColor = entidadesBorderColors;
    charts.entidades.update();

    // Actualizar gráfico de saldos (filtrar por entidad si es necesario)
    let saldosData = data.saldos;
    let saldosLabels = ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'];
    
    if (entity !== 'all') {
        const entityIndex = getEntityIndex(entity);
        if (entityIndex !== -1) {
            saldosData = [data.saldos[entityIndex]];
            saldosLabels = [getEntityName(entity)];
        }
    }

    charts.saldo.data.labels = saldosLabels;
    charts.saldo.data.datasets[0].data = saldosData;
    charts.saldo.update();

    // Actualizar gráfico estadísticas
    charts.estadisticas.data.datasets[0].data = [data.stats.pagadas, data.stats.negadas, data.stats.pendientes];
    charts.estadisticas.update();
}

function getMonthName(monthNum) {
    const months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthNum];
}

function getEntityIndex(entity) {
    const entities = ['arl_sura', 'mutual_ser', 'cafam_salud', 'assist_salud', 'famisanar'];
    return entities.indexOf(entity);
}

function getEntityName(entity) {
    const names = {
        'arl_sura': 'ARL SURA',
        'mutual_ser': 'MUTUAL SER', 
        'cafam_salud': 'CAFAM SALUD',
        'assist_salud': 'ASSIST SALUD',
        'famisanar': 'FAMISANAR'
    };
    return names[entity];
}

function getEntityColor(entity) {
    const colors = {
        'arl_sura': 'rgba(244, 63, 94, 0.8)',
        'mutual_ser': 'rgba(16, 185, 129, 0.8)',
        'cafam_salud': 'rgba(59, 130, 246, 0.8)',
        'assist_salud': 'rgba(245, 158, 11, 0.8)',
        'famisanar': 'rgba(168, 85, 247, 0.8)'
    };
    return colors[entity] || 'rgba(244, 63, 94, 0.8)';
}

function getEntityBorderColor(entity) {
    const colors = {
        'arl_sura': 'rgba(244, 63, 94, 1)',
        'mutual_ser': 'rgba(16, 185, 129, 1)',
        'cafam_salud': 'rgba(59, 130, 246, 1)',
        'assist_salud': 'rgba(245, 158, 11, 1)',
        'famisanar': 'rgba(168, 85, 247, 1)'
    };
    return colors[entity] || 'rgba(244, 63, 94, 1)';
}

// Modo oscuro
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    
    if (isDark) {
        html.classList.remove('dark');
        toggleBtn.textContent = '🌙';
        localStorage.setItem('darkMode', 'false');
        updateChartsTheme(false);
    } else {
        html.classList.add('dark');
        toggleBtn.textContent = '☀️';
        localStorage.setItem('darkMode', 'true');
        updateChartsTheme(true);
    }
}

function updateChartsTheme(isDark) {
    const textColor = isDark ? '#f9fafb' : '#6b7280';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    Chart.defaults.color = textColor;
    
    Object.values(charts).forEach(chart => {
        if (chart.options.scales?.y?.grid) {
            chart.options.scales.y.grid.color = gridColor;
        }
        if (chart.options.scales?.x?.grid) {
            chart.options.scales.x.grid.color = gridColor;
        }
        chart.update();
    });
}

// Inicializar modo oscuro desde localStorage
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    
    if (savedMode === 'true') {
        document.documentElement.classList.add('dark');
        toggleBtn.textContent = '☀️';
    } else {
        toggleBtn.textContent = '🌙';
    }
}

// Funcionalidad del sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    
    // En desktop (pantalla grande)
    if (window.innerWidth > 1024) {
        sidebar.classList.toggle('hidden');
        mainContent.classList.toggle('sidebar-hidden');
    } else {
        // En móvil/tablet
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }
}

// Funcionalidad de dropdown en sidebar
function toggleDropdown(element) {
    const submenu = element.nextElementSibling;
    const chevron = element.querySelector('.chevron');
    
    // Toggle del submenu
    submenu.classList.toggle('open');
    element.classList.toggle('expanded');
    
    // Cerrar otros dropdowns
    const allDropdowns = document.querySelectorAll('.nav-item');
    allDropdowns.forEach(item => {
        if (item !== element && item.classList.contains('expanded')) {
            item.classList.remove('expanded');
            const otherSubmenu = item.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains('submenu')) {
                otherSubmenu.classList.remove('open');
            }
        }
    });
}

// Cerrar sidebar al hacer clic fuera (solo en móvil)
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (window.innerWidth <= 1024 && 
        !sidebar.contains(event.target) && 
        !sidebarToggle.contains(event.target) &&
        sidebar.classList.contains('show')) {
        toggleSidebar();
    }
});

// Ajustar comportamiento en resize de ventana
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth > 1024) {
        // Desktop: remover clases de móvil
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        
        // Mantener estado hidden si estaba oculto
        if (!sidebar.classList.contains('hidden')) {
            mainContent.classList.remove('sidebar-hidden');
        }
    } else {
        // Móvil: resetear estado desktop
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('sidebar-hidden');
    }
});

// Navegación activa en submenu
document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover active de todos los submenu items
        document.querySelectorAll('.submenu-item').forEach(subItem => {
            subItem.classList.remove('active');
        });
        
        // Activar el item clickeado
        this.classList.add('active');
    });
});

// Navegación activa principal
document.querySelectorAll('.nav-item:not([onclick])').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Solo activar si no tiene submenu
        if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('submenu')) {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeCharts();
    setupFilterListeners();
    applyFilters();
    
    // Establecer valores por defecto en los filtros
    document.getElementById('yearFilter').value = '2025';
    document.getElementById('monthFilter').value = 'all';
    document.getElementById('entityFilter').value = 'all';
});