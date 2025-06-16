// dashboard.js - Versión expandida con nuevos gráficos

// Datos de municipios por departamento (principales ciudades)
const municipiosPorDepartamento = {
    antioquia: [
        { value: 'medellin', name: 'Medellín' },
        { value: 'bello', name: 'Bello' },
        { value: 'itagui', name: 'Itagüí' },
        { value: 'envigado', name: 'Envigado' },
        { value: 'apartado', name: 'Apartadó' },
        { value: 'turbo', name: 'Turbo' },
        { value: 'rionegro', name: 'Rionegro' },
        { value: 'sabaneta', name: 'Sabaneta' }
    ],
    atlantico: [
        { value: 'barranquilla', name: 'Barranquilla' },
        { value: 'soledad', name: 'Soledad' },
        { value: 'malambo', name: 'Malambo' },
        { value: 'sabanalarga', name: 'Sabanalarga' },
        { value: 'puerto_colombia', name: 'Puerto Colombia' }
    ],
    bogota: [
        { value: 'bogota', name: 'Bogotá D.C.' }
    ],
    bolivar: [
        { value: 'cartagena', name: 'Cartagena' },
        { value: 'magangue', name: 'Magangué' },
        { value: 'turbaco', name: 'Turbaco' },
        { value: 'arjona', name: 'Arjona' }
    ],
    valle_del_cauca: [
        { value: 'cali', name: 'Cali' },
        { value: 'palmira', name: 'Palmira' },
        { value: 'buenaventura', name: 'Buenaventura' },
        { value: 'tulua', name: 'Tuluá' },
        { value: 'cartago', name: 'Cartago' },
        { value: 'buga', name: 'Buga' }
    ],
    santander: [
        { value: 'bucaramanga', name: 'Bucaramanga' },
        { value: 'floridablanca', name: 'Floridablanca' },
        { value: 'giron', name: 'Girón' },
        { value: 'piedecuesta', name: 'Piedecuesta' },
        { value: 'barrancabermeja', name: 'Barrancabermeja' }
    ],
    cundinamarca: [
        { value: 'soacha', name: 'Soacha' },
        { value: 'girardot', name: 'Girardot' },
        { value: 'zipaquira', name: 'Zipaquirá' },
        { value: 'facatativa', name: 'Facatativá' },
        { value: 'chía', name: 'Chía' },
        { value: 'mosquera', name: 'Mosquera' }
    ]
};

// Datos simulados expandidos
const dataByPeriod = {
    2025: {
        all: {
            stats: { pagadas: 1023248, negadas: 3893856, pendientes: 31083396, recibidas: 5420000, radicadas: 3850000, total: 45270500 },
            nomina: [723248, 300000],
            administradora: [865000, 158000],
            saldos: [9627487, 10831968, 9651606, 4302738, 2586201],
            incapacityTypes: {
                enfermedad_general: 15840,
                licencia_maternidad: 3920,
                licencia_paternidad: 2150,
                accidente_laboral: 1890
            },
            geographic: {
                antioquia: 8500,
                bogota: 12300,
                valle_del_cauca: 6800,
                santander: 4200,
                atlantico: 3900
            },
            monthlyTrend: [2800, 3100, 2950, 3300, 3800, 4100, 3900, 3700, 3500, 3200, 2900, 3100],
            processingTime: {
                '0-7_dias': 8500,
                '8-15_dias': 6200,
                '16-30_dias': 4800,
                'mas_30_dias': 3300
            }
        },
        5: {
            stats: { pagadas: 333124, negadas: 1271928, pendientes: 10135694, recibidas: 1806667, radicadas: 1283333, total: 14830746 },
            nomina: [333124, 0],
            administradora: [295000, 31000],
            saldos: [3227487, 3331968, 3151606, 1402738, 902261],
            incapacityTypes: {
                enfermedad_general: 1840,
                licencia_maternidad: 420,
                licencia_paternidad: 180,
                accidente_laboral: 160
            },
            geographic: {
                antioquia: 950,
                bogota: 1200,
                valle_del_cauca: 680,
                santander: 420,
                atlantico: 390
            },
            monthlyTrend: [3800],
            processingTime: {
                '0-7_dias': 1200,
                '8-15_dias': 800,
                '16-30_dias': 600,
                'mas_30_dias': 400
            }
        }
    },
    2024: {
        all: {
            stats: { pagadas: 847000, negadas: 3420000, pendientes: 28733000, recibidas: 4800000, radicadas: 3200000, total: 41000000 },
            nomina: [565000, 282000],
            administradora: [798000, 132000],
            saldos: [8150000, 9350000, 8050000, 3700000, 2250000],
            incapacityTypes: {
                enfermedad_general: 14200,
                licencia_maternidad: 3500,
                licencia_paternidad: 1950,
                accidente_laboral: 1650
            },
            geographic: {
                antioquia: 7800,
                bogota: 11200,
                valle_del_cauca: 6200,
                santander: 3800,
                atlantico: 3500
            },
            monthlyTrend: [2500, 2800, 2600, 2900, 3400, 3600, 3400, 3200, 3000, 2800, 2600, 2700],
            processingTime: {
                '0-7_dias': 7500,
                '8-15_dias': 5500,
                '16-30_dias': 4200,
                'mas_30_dias': 2800
            }
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
            labels: ['Pagado por Nómina', 'Pagado por Administradora'],
            datasets: [{
                label: 'Monto ($)',
                data: [723248, 865000],
                backgroundColor: [
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                    'rgba(244, 63, 94, 1)',
                    'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
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
                            return '$' + value.toLocaleString();
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
        type: 'doughnut',
        data: {
            labels: ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'],
            datasets: [{
                data: [35, 28, 20, 12, 5],
                backgroundColor: [
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(168, 85, 247, 0.8)'
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

    // Gráfico de Tipos de Incapacidad
    const incapacityTypeCtx = document.getElementById('incapacityTypeChart').getContext('2d');
    charts.incapacityType = new Chart(incapacityTypeCtx, {
        type: 'bar',
        data: {
            labels: ['Enfermedad General', 'Lic. Maternidad', 'Lic. Paternidad', 'Accidente Laboral'],
            datasets: [{
                label: 'Cantidad de Casos',
                data: [15840, 3920, 2150, 1890],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(245, 158, 11, 1)'
                ],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
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

    // Gráfico Geográfico
    const geographicCtx = document.getElementById('geographicChart').getContext('2d');
    charts.geographic = new Chart(geographicCtx, {
        type: 'pie',
        data: {
            labels: ['Bogotá D.C.', 'Antioquia', 'Valle del Cauca', 'Santander', 'Atlántico'],
            datasets: [{
                data: [12300, 8500, 6800, 4200, 3900],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(168, 85, 247, 0.8)'
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(34, 197, 94, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(239, 68, 68, 1)',
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
                data: [9627487, 10831968, 9651606, 4302738, 2586201],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 6
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
                            return '$' + (value / 1000000).toFixed(1) + 'M';
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

    // Gráfico de Tendencia Mensual
    const monthlyTrendCtx = document.getElementById('monthlyTrendChart').getContext('2d');
    charts.monthlyTrend = new Chart(monthlyTrendCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Casos por Mes',
                data: [2800, 3100, 2950, 3300, 3800, 4100, 3900, 3700, 3500, 3200, 2900, 3100],
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
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

    // Gráfico de Tiempo de Procesamiento
    const processingTimeCtx = document.getElementById('processingTimeChart').getContext('2d');
    charts.processingTime = new Chart(processingTimeCtx, {
        type: 'doughnut',
        data: {
            labels: ['0-7 días', '8-15 días', '16-30 días', '+30 días'],
            datasets: [{
                data: [8500, 6200, 4800, 3300],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
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

    // Gráfico de Estadísticas Generales
    const estadisticasCtx = document.getElementById('estadisticasChart').getContext('2d');
    charts.estadisticas = new Chart(estadisticasCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pagadas (3%)', 'Negadas (11%)', 'Pendientes (86%)', 'Recibidas (12%)', 'Radicadas (8%)'],
            datasets: [{
                data: [1023248, 3893856, 31083396, 5420000, 3850000],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(244, 63, 94, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(244, 63, 94, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(59, 130, 246, 1)',
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
}

// Función para actualizar municipios cuando cambia el departamento
function updateMunicipalities() {
    const departmentSelect = document.getElementById('departmentFilter');
    const municipalitySelect = document.getElementById('municipalityFilter');
    const selectedDepartment = departmentSelect.value;

    // Limpiar municipios
    municipalitySelect.innerHTML = '<option value="all">Todos los municipios</option>';

    if (selectedDepartment !== 'all' && municipiosPorDepartamento[selectedDepartment]) {
        const municipios = municipiosPorDepartamento[selectedDepartment];
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.value;
            option.textContent = municipio.name;
            municipalitySelect.appendChild(option);
        });
    }

    // Marcar filtro como activo
    toggleFilterActive('departmentFilter', selectedDepartment !== 'all');
}

// Función para marcar filtros como activos
function toggleFilterActive(filterId, isActive) {
    const filterGroup = document.getElementById(filterId).closest('.filter-group');
    if (isActive) {
        filterGroup.classList.add('active');
    } else {
        filterGroup.classList.remove('active');
    }
}

// Aplicar filtros
function applyFilters() {
    const year = document.getElementById('yearFilter').value;
    const month = document.getElementById('monthFilter').value;
    const entity = document.getElementById('entityFilter').value;
    const department = document.getElementById('departmentFilter').value;
    const municipality = document.getElementById('municipalityFilter').value;
    const incapacityType = document.getElementById('incapacityTypeFilter').value;

    // Marcar filtros activos
    toggleFilterActive('yearFilter', year !== '2025');
    toggleFilterActive('monthFilter', month !== 'all');
    toggleFilterActive('entityFilter', entity !== 'all');
    toggleFilterActive('departmentFilter', department !== 'all');
    toggleFilterActive('municipalityFilter', municipality !== 'all');
    toggleFilterActive('incapacityTypeFilter', incapacityType !== 'all');

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
    updateCharts(data, month, entity, department, municipality, incapacityType);

    // Actualizar título
    const selectedYear = year;
    const selectedMonth = month === 'all' ? 'Todos los meses' : getMonthName(parseInt(month));
    const selectedDepartment = department === 'all' ? '' : ` - ${getDepartmentName(department)}`;
    const selectedMunicipality = municipality === 'all' ? '' : ` - ${getMunicipalityName(municipality)}`;
    const selectedIncapacityType = incapacityType === 'all' ? '' : ` - ${getIncapacityTypeName(incapacityType)}`;
    
    document.querySelector('.header h1').textContent = 
        `Incapacidades Nómina vs Pagos Recibidos - ${selectedMonth} ${selectedYear}${selectedDepartment}${selectedMunicipality}${selectedIncapacityType}`;
}

// Limpiar todos los filtros
function clearFilters() {
    document.getElementById('yearFilter').value = '2025';
    document.getElementById('monthFilter').value = 'all';
    document.getElementById('entityFilter').value = 'all';
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('municipalityFilter').value = 'all';
    document.getElementById('incapacityTypeFilter').value = 'all';
    
    // Remover clases activas
    document.querySelectorAll('.filter-group.active').forEach(group => {
        group.classList.remove('active');
    });
    
    updateMunicipalities();
    applyFilters();
}

// Aplicar filtros automáticamente al cambiar selects
function setupFilterListeners() {
    document.getElementById('yearFilter').addEventListener('change', applyFilters);
    document.getElementById('monthFilter').addEventListener('change', applyFilters);
    document.getElementById('entityFilter').addEventListener('change', applyFilters);
    document.getElementById('departmentFilter').addEventListener('change', function() {
        updateMunicipalities();
        applyFilters();
    });
    document.getElementById('municipalityFilter').addEventListener('change', applyFilters);
    document.getElementById('incapacityTypeFilter').addEventListener('change', applyFilters);
}

function updateStatsCards(stats) {
    document.querySelector('.stat-card:nth-child(1) .value').textContent = '$' + stats.pagadas.toLocaleString();
    document.querySelector('.stat-card:nth-child(2) .value').textContent = '$' + stats.negadas.toLocaleString();
    document.querySelector('.stat-card:nth-child(3) .value').textContent = '$' + stats.pendientes.toLocaleString();
    document.querySelector('.stat-card:nth-child(4) .value').textContent = '$' + stats.total.toLocaleString();
    document.querySelector('.stat-card:nth-child(5) .value').textContent = '$' + stats.recibidas.toLocaleString();
    document.querySelector('.stat-card:nth-child(6) .value').textContent = '$' + stats.radicadas.toLocaleString();

    // Actualizar porcentajes
    const pagadasPct = ((stats.pagadas / stats.total) * 100).toFixed(1);
    const negadasPct = ((stats.negadas / stats.total) * 100).toFixed(1);
    const pendientesPct = ((stats.pendientes / stats.total) * 100).toFixed(1);
    const recibidasPct = ((stats.recibidas / stats.total) * 100).toFixed(1);
    const radicadasPct = ((stats.radicadas / stats.total) * 100).toFixed(1);

    document.querySelector('.stat-card:nth-child(1) .change').textContent = `${pagadasPct}% del total`;
    document.querySelector('.stat-card:nth-child(2) .change').textContent = `${negadasPct}% del total`;
    document.querySelector('.stat-card:nth-child(3) .change').textContent = `${pendientesPct}% del total`;
    document.querySelector('.stat-card:nth-child(5) .change').textContent = `${recibidasPct}% del total`;
    document.querySelector('.stat-card:nth-child(6) .change').textContent = `${radicadasPct}% del total`;
}   

function updateCharts(data, month, entity, department, municipality, incapacityType) {
    // Actualizar gráfico de nómina vs administradora
    charts.nomina.data.datasets[0].data = data.nomina;
    charts.nomina.update();

    // Actualizar gráfico de tipos de incapacidad
    if (incapacityType !== 'all') {
        const typeValue = data.incapacityTypes[incapacityType] || 0;
        charts.incapacityType.data.labels = [getIncapacityTypeName(incapacityType)];
        charts.incapacityType.data.datasets[0].data = [typeValue];
        charts.incapacityType.data.datasets[0].backgroundColor = [getIncapacityTypeColor(incapacityType)];
    } else {
        charts.incapacityType.data.labels = ['Enfermedad General', 'Lic. Maternidad', 'Lic. Paternidad', 'Accidente Laboral'];
        charts.incapacityType.data.datasets[0].data = [
            data.incapacityTypes.enfermedad_general,
            data.incapacityTypes.licencia_maternidad,
            data.incapacityTypes.licencia_paternidad,
            data.incapacityTypes.accidente_laboral
        ];
        charts.incapacityType.data.datasets[0].backgroundColor = [
            'rgba(239, 68, 68, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)'
        ];
    }
    charts.incapacityType.update();

    // Actualizar gráfico geográfico
    if (department !== 'all') {
        const deptValue = data.geographic[department] || 0;
        charts.geographic.data.labels = [getDepartmentName(department)];
        charts.geographic.data.datasets[0].data = [deptValue];
        charts.geographic.data.datasets[0].backgroundColor = [getDepartmentColor(department)];
    } else {
        charts.geographic.data.labels = ['Bogotá D.C.', 'Antioquia', 'Valle del Cauca', 'Santander', 'Atlántico'];
        charts.geographic.data.datasets[0].data = [
            data.geographic.bogota,
            data.geographic.antioquia,
            data.geographic.valle_del_cauca,
            data.geographic.santander,
            data.geographic.atlantico
        ];
        charts.geographic.data.datasets[0].backgroundColor = [
            'rgba(99, 102, 241, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(168, 85, 247, 0.8)'
        ];
    }
    charts.geographic.update();

    // Actualizar tendencia mensual
    if (month !== 'all') {
        const monthValue = data.monthlyTrend[0] || 0;
        charts.monthlyTrend.data.labels = [getMonthName(parseInt(month))];
        charts.monthlyTrend.data.datasets[0].data = [monthValue];
    } else {
        charts.monthlyTrend.data.labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        charts.monthlyTrend.data.datasets[0].data = data.monthlyTrend;
    }
    charts.monthlyTrend.update();

    // Actualizar tiempo de procesamiento
    charts.processingTime.data.datasets[0].data = [
        data.processingTime['0-7_dias'],
        data.processingTime['8-15_dias'],
        data.processingTime['16-30_dias'],
        data.processingTime['mas_30_dias']
    ];
    charts.processingTime.update();

    // Actualizar otros gráficos existentes
    updateExistingCharts(data, entity);
}

function updateExistingCharts(data, entity) {
    // Actualizar gráfico circular de entidades
    let entidadesData, entidadesLabels, entidadesColors;
    
    if (entity !== 'all') {
        entidadesData = [100];
        entidadesLabels = [getEntityName(entity)];
        entidadesColors = [getEntityColor(entity)];
    } else {
        entidadesData = [35, 28, 20, 12, 5];
        entidadesLabels = ['ARL SURA', 'MUTUAL SER', 'CAFAM SALUD', 'ASSIST SALUD', 'FAMISANAR'];
        entidadesColors = [
            'rgba(244, 63, 94, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(168, 85, 247, 0.8)'
        ];
    }

    charts.entidades.data.labels = entidadesLabels;
    charts.entidades.data.datasets[0].data = entidadesData;
    charts.entidades.data.datasets[0].backgroundColor = entidadesColors;
    charts.entidades.update();

    // Actualizar gráfico de saldos
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
    const totalRecords = data.stats.pagadas + data.stats.negadas + data.stats.pendientes + data.stats.recibidas + data.stats.radicadas;
    const pagadasPct = ((data.stats.pagadas / totalRecords) * 100).toFixed(0);
    const negadasPct = ((data.stats.negadas / totalRecords) * 100).toFixed(0);
    const pendientesPct = ((data.stats.pendientes / totalRecords) * 100).toFixed(0);
    const recibidasPct = ((data.stats.recibidas / totalRecords) * 100).toFixed(0);
    const radicadasPct = ((data.stats.radicadas / totalRecords) * 100).toFixed(0);

    charts.estadisticas.data.labels = [
        `Pagadas (${pagadasPct}%)`,
        `Negadas (${negadasPct}%)`,
        `Pendientes (${pendientesPct}%)`,
        `Recibidas (${recibidasPct}%)`,
        `Radicadas (${radicadasPct}%)`
    ];
    charts.estadisticas.data.datasets[0].data = [
        data.stats.pagadas,
        data.stats.negadas,
        data.stats.pendientes,
        data.stats.recibidas,
        data.stats.radicadas
    ];
    charts.estadisticas.update();
}


// Funciones auxiliares
function getMonthName(monthNum) {
    const months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthNum];
}

function getDepartmentName(department) {
    const names = {
        'antioquia': 'Antioquia',
        'atlantico': 'Atlántico',
        'bogota': 'Bogotá D.C.',
        'bolivar': 'Bolívar',
        'valle_del_cauca': 'Valle del Cauca',
        'santander': 'Santander',
        'cundinamarca': 'Cundinamarca'
    };
    return names[department] || department;
}

function getDepartmentColor(department) {
    const colors = {
        'antioquia': 'rgba(34, 197, 94, 0.8)',
        'atlantico': 'rgba(168, 85, 247, 0.8)',
        'bogota': 'rgba(99, 102, 241, 0.8)',
        'valle_del_cauca': 'rgba(251, 191, 36, 0.8)',
        'santander': 'rgba(239, 68, 68, 0.8)'
    };
    return colors[department] || 'rgba(156, 163, 175, 0.8)';
}

function getMunicipalityName(municipality) {
    for (const dept in municipiosPorDepartamento) {
        const municipio = municipiosPorDepartamento[dept].find(m => m.value === municipality);
        if (municipio) {
            return municipio.name;
        }
    }
    return municipality;
}

function getIncapacityTypeName(type) {
    const names = {
        'enfermedad_general': 'Enfermedad General',
        'licencia_maternidad': 'Licencia de Maternidad',
        'licencia_paternidad': 'Licencia de Paternidad',
        'accidente_laboral': 'Accidente Laboral'
    };
    return names[type] || type;
}

function getIncapacityTypeColor(type) {
    const colors = {
        'enfermedad_general': 'rgba(239, 68, 68, 0.8)',
        'licencia_maternidad': 'rgba(236, 72, 153, 0.8)',
        'licencia_paternidad': 'rgba(59, 130, 246, 0.8)',
        'accidente_laboral': 'rgba(245, 158, 11, 0.8)'
    };
    return colors[type] || 'rgba(156, 163, 175, 0.8)';
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
    
    if (window.innerWidth > 1024) {
        sidebar.classList.toggle('hidden');
        mainContent.classList.toggle('sidebar-hidden');
    } else {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }
}

// Funcionalidad de dropdown en sidebar
function toggleDropdown(element) {
    const submenu = element.nextElementSibling;
    
    submenu.classList.toggle('open');
    element.classList.toggle('expanded');
    
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

// Event listeners
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

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        
        if (!sidebar.classList.contains('hidden')) {
            mainContent.classList.remove('sidebar-hidden');
        }
    } else {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('sidebar-hidden');
    }
});

// Navegación activa en submenu
document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.submenu-item').forEach(subItem => {
            subItem.classList.remove('active');
        });
        
        this.classList.add('active');
    });
});

// Navegación activa principal
document.querySelectorAll('.nav-item:not([onclick])').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('submenu')) {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Atajos de teclado
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        applyFilters();
    }
    
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearFilters();
    }
    
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('show')) {
            toggleSidebar();
        }
    }
});

// Funciones adicionales
function showLoadingState() {
    const applyBtn = document.querySelector('.apply-filters-btn');
    if (!applyBtn) return;
    
    const originalText = applyBtn.innerHTML;
    applyBtn.innerHTML = '⏳ Aplicando...';
    applyBtn.disabled = true;
    
    setTimeout(() => {
        applyBtn.innerHTML = originalText;
        applyBtn.disabled = false;
    }, 500);
}

function exportData(format = 'excel') {
    console.log(`Exportando datos en formato ${format}...`);
    alert(`Función de exportación a ${format} - Próximamente disponible`);
}

function generateReport() {
    const filters = {
        year: document.getElementById('yearFilter').value,
        month: document.getElementById('monthFilter').value,
        entity: document.getElementById('entityFilter').value,
        department: document.getElementById('departmentFilter').value,
        municipality: document.getElementById('municipalityFilter').value,
        incapacityType: document.getElementById('incapacityTypeFilter').value
    };
    
    console.log('Generando reporte con filtros:', filters);
    
    const reportData = {
        timestamp: new Date().toISOString(),
        filters: filters,
        summary: 'Reporte generado exitosamente'
    };
    
    alert('Reporte generado. Ver consola para detalles.');
    return reportData;
}

function quickSearch(searchTerm) {
    if (!searchTerm) return;
    
    const entityOptions = document.querySelectorAll('#entityFilter option');
    entityOptions.forEach(option => {
        if (option.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            document.getElementById('entityFilter').value = option.value;
        }
    });
    
    const deptOptions = document.querySelectorAll('#departmentFilter option');
    deptOptions.forEach(option => {
        if (option.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            document.getElementById('departmentFilter').value = option.value;
            updateMunicipalities();
        }
    });
    
    applyFilters();
}

function debugDashboard() {
    console.log('=== DEBUG DASHBOARD ===');
    console.log('Charts:', Object.keys(charts));
    console.log('Filtros activos:', {
        year: document.getElementById('yearFilter').value,
        month: document.getElementById('monthFilter').value,
        entity: document.getElementById('entityFilter').value,
        department: document.getElementById('departmentFilter').value,
        municipality: document.getElementById('municipalityFilter').value,
        incapacityType: document.getElementById('incapacityTypeFilter').value
    });
    console.log('Modo oscuro:', document.documentElement.classList.contains('dark'));
    console.log('Sidebar visible:', !document.getElementById('sidebar').classList.contains('hidden'));
    console.log('======================');
}

function validateData(data) {
    if (!data || typeof data !== 'object') {
        console.warn('Datos inválidos recibidos');
        return false;
    }
    
    const requiredFields = ['stats', 'nomina', 'administradora', 'saldos'];
    for (const field of requiredFields) {
        if (!data[field]) {
            console.warn(`Campo requerido faltante: ${field}`);
            return false;
        }
    }
    
    return true;
}

// Exponer funciones útiles globalmente para debugging
window.dashboardDebug = {
    debugDashboard,
    generateReport,
    exportData,
    quickSearch,
    showLoadingState
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeCharts();
    setupFilterListeners();
    updateMunicipalities();
    applyFilters();
    
    // Establecer valores por defecto en los filtros
    document.getElementById('yearFilter').value = '2025';
    document.getElementById('monthFilter').value = 'all';
    document.getElementById('entityFilter').value = 'all';
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('municipalityFilter').value = 'all';
    document.getElementById('incapacityTypeFilter').value = 'all';
});