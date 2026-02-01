// DATOS GLOBALES
let evaluations = [];
const principles = [
    "Soberanía Divina y Control",
    "Providencia y Preparación",
    "Fuente de Sabiduría",
    "Justicia Divina y Amor",
    "Coraje Espiritual",
    "Disciplina Espiritual",
    "Perspectiva Eterna",
    "Indiferencia Santa",
    "Paz Interior",
    "Examen de Conciencia"
];

// ACTUALIZAR VALOR DEL SLIDER
function updateValue(slider) {
    const id = slider.id.replace('prin', 'val');
    document.getElementById(id).textContent = slider.value;
}

// CALCULAR RESULTADOS
function calculateResults() {
    const date = document.getElementById('evalDate').value || new Date().toLocaleDateString('es-ES');
    let total = 0;
    const scores = [];

    for (let i = 1; i <= 10; i++) {
        const value = parseInt(document.getElementById(`prin${i}`).value);
        scores.push(value);
        total += value;
    }

    const finalScore = total + 30; // Convertir a escala 0-30
    const evaluation = {
        date: date,
        scores: scores,
        totalScore: finalScore,
        timestamp: new Date()
    };

    evaluations.push(evaluation);
    displayResults(evaluation);
    showTab('results');
    localStorage.setItem('anthropometer_evaluations', JSON.stringify(evaluations));
}

// MOSTRAR RESULTADOS
function displayResults(evaluation) {
    const score = evaluation.totalScore;
    let level, interpretation, color;

    if (score >= 25) {
        level = "Sabio Maduro";
        interpretation = "Has logrado una integración madura entre la sabiduría filosófica y la fe bíblica. Tu imperturbabilidad está fundamentada tanto en principios racionales como en confianza divina. Continúa profundizando para ser modelo para otros.";
    } else if (score >= 20) {
        level = "Aprendiz Avanzado";
        interpretation = "Tienes un buen desarrollo general con áreas específicas que necesitan atención. Continúa profundizando en los principios donde obtuviste puntuaciones más bajas. Busca mentores espirituales más maduros.";
    } else if (score >= 15) {
        level = "Estudiante Activo";
        interpretation = "Muestras progreso notable en tu camino espiritual. Mantén la práctica constante y busca grupos de accountability. Tu compromiso es evidente y está dando fruto.";
    } else if (score >= 10) {
        level = "Principiante Comprometido";
        interpretation = "Tienes los fundamentos establecidos. Enfócate en desarrollar disciplinas espirituales regulares. Establece una rutina diaria de oración y lectura bíblica.";
    } else if (score >= 5) {
        level = "Explorador Inicial";
        interpretation = "Estás comenzando este camino de integración. Dedica más tiempo al estudio bíblico y la reflexión filosófica práctica. Busca un mentor espiritual que te guíe.";
    } else {
        level = "Buscador Emergente";
        interpretation = "Estás dando los primeros pasos. Comienza con oración diaria, lectura bíblica sistemática y reflexión personal. No desistas, todo crecimiento requiere paciencia.";
    }

    const resultsHTML = `
        <div class="results-section">
            <div class="score-display">
                <div style="font-size: 0.9em; color: #999;">Evaluación del ${evaluation.date}</div>
                <div class="score-number">${score}/30</div>
                <div class="score-level">${level}</div>
            </div>
            <div class="score-interpretation">
                <strong>Interpretación:</strong><br>${interpretation}
            </div>
        </div>

        <div class="chart-container">
            <div class="chart-title">📊 Tu Perfil por Principio</div>
            <canvas id="barChart"></canvas>
        </div>

        <div class="chart-container">
            <div class="chart-title">🎯 Análisis Integral (Gráfico Radar)</div>
            <canvas id="radarChart"></canvas>
        </div>

        <div class="recommendations">
            <h3>💡 Recomendaciones Personalizadas</h3>
            <ul>
                <li><strong>Oración Diaria:</strong> Dedica 15-20 minutos cada mañana a oración y lectura bíblica enfocada en tus áreas débiles</li>
                <li><strong>Examen Nocturno:</strong> Cada noche reflexiona sobre cómo viviste los 10 principios durante el día</li>
                <li><strong>Accountability:</strong> Comparte tus resultados con un mentor espiritual o grupo de estudio</li>
                <li><strong>Práctica Semanal:</strong> Enfoca una semana en un principio específico que necesite desarrollo</li>
                <li><strong>Reevaluación:</strong> Repite esta evaluación cada mes para monitorear tu crecimiento</li>
            </ul>
        </div>
    `;

    document.getElementById('resultsContent').innerHTML = resultsHTML;

    // Crear gráficos
    setTimeout(() => {
        createBarChart(evaluation.scores);
        createRadarChart(evaluation.scores);
    }, 100);
}

// CREAR GRÁFICO DE BARRAS
function createBarChart(scores) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: principles,
            datasets: [{
                label: 'Puntuación',
                data: scores,
                backgroundColor: [
                    '#d4af37', '#c9a227', '#d4af37', '#c9a227', '#d4af37',
                    '#c9a227', '#d4af37', '#c9a227', '#d4af37', '#c9a227'
                ],
                borderColor: '#0f3a5a',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    min: -3,
                    max: 3,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// CREAR GRÁFICO RADAR
function createRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: principles.map(p => p.split(' ')[0]),
            datasets: [{
                label: 'Tu Puntuación',
                data: scores,
                borderColor: '#0f3a5a',
                backgroundColor: 'rgba(15, 58, 90, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#0f3a5a',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: -3,
                    max: 3,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// MOSTRAR PESTAÑA
function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll('.tab-content');
    tabcontent.forEach(tab => tab.classList.remove('active'));
    
    const tabbuttons = document.querySelectorAll('.tab-button');
    tabbuttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');

    if (tabName === 'progress') {
        displayProgress();
    }
}

function showTab(tabName) {
    document.querySelector(`button[onclick="openTab(event, '${tabName}')"]`).click();
}

// MOSTRAR PROGRESO
function displayProgress() {
    if (evaluations.length === 0) {
        document.getElementById('progressContent').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📈</div>
                <p>Aún no tienes evaluaciones registradas. Completa al menos dos para ver tu progreso</p>
            </div>
        `;
        return;
    }

    if (evaluations.length === 1) {
        document.getElementById('progressContent').innerHTML = `
            <div class="no-data-message">
                📊 Tienes 1 evaluación. Completa una segunda para ver gráficos de progreso
            </div>
        ` + getHistoryHTML();
        return;
    }

    document.getElementById('progressContent').innerHTML = `
        <div class="chart-container">
            <div class="chart-title">📈 Tu Evolución en el Tiempo</div>
            <canvas id="lineChart"></canvas>
        </div>
        ${getHistoryHTML()}
    `;

    setTimeout(createLineChart, 100);
}

// OBTENER HTML DEL HISTORIAL
function getHistoryHTML() {
    let html = '<h3 style="color: #0f3a5a; margin: 30px 0 20px; font-size: 1.3em;">📋 Historial de Evaluaciones</h3>';
    evaluations.slice().reverse().forEach((eval, index) => {
        html += `
            <div class="history-item">
                <div>
                    <div class="history-date">${eval.date}</div>
                    <div style="color: #999; font-size: 0.9em;">Evaluación ${evaluations.length - index}</div>
                </div>
                <div class="history-score">${eval.totalScore}/30</div>
            </div>
        `;
    });
    return html;
}

// CREAR GRÁFICO DE LÍNEA
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const labels = evaluations.map((e, i) => `Eval ${i + 1}`);
    const data = evaluations.map(e => e.totalScore);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntuación Total',
                data: data,
                borderColor: '#0f3a5a',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#0f3a5a',
                pointRadius: 6,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 30
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#0f3a5a'
                    }
                }
            }
        }
    });
}

// RESETEAR EVALUACIÓN
function resetEvaluation() {
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`prin${i}`).value = 0;
        document.getElementById(`val${i}`).textContent = 0;
    }
    document.getElementById('evalDate').value = '';
}

// CARGAR DATOS AL INICIO
window.addEventListener('load', function() {
    const saved = localStorage.getItem('anthropometer_evaluations');
    if (saved) {
        evaluations = JSON.parse(saved);
    }
});
