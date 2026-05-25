/* ========================================
   El 99% de esto esta hecho con CLAUDE y un 0.0001% con mi propio código (para atar cabos y cosas específicas de la lógica de la calculadora).
   Posdata: No sé programar en JavaScript :v
   ======================================== */

// ---- DATOS DE LAS PREGUNTAS ----
// Cada pregunta tiene id, categoría, texto, hint, ícono y opciones con valor de CO₂ diario en kg

const preguntas = [
  {
    id: 0,
    categoria: "Transporte",
    icono: "🚗",
    titulo: "¿Cuál es tu principal medio de transporte?",
    hint: "Selecciona el transporte que usas con más frecuencia en tu día a día.",
    opciones: [
      { emoji: "🚴", nombre: "Pie o Bicicleta", co2Dia: 0, label: "0 kg CO₂/día" },
      { emoji: "🚌", nombre: "Transporte Público", co2Dia: 0.6, label: "0.6 kg CO₂/día" },
      { emoji: "🏍️", nombre: "Moto", co2Dia: 1.2, label: "1.2 kg CO₂/día" },
      { emoji: "🚙", nombre: "Auto Compartido", co2Dia: 2.3, label: "2.3 kg CO₂/día" },
      { emoji: "🚘", nombre: "Auto Propio", co2Dia: 4.6, label: "4.6 kg CO₂/día" },
      { emoji: "✈️", nombre: "Avión Frecuente", co2Dia: 8.0, label: "8.0 kg CO₂/día" }
    ]
  },
  {
    id: 1,
    categoria: "Electrónica",
    icono: "💻",
    titulo: "¿Cuántas horas al día usas dispositivos electrónicos?",
    hint: "Considera celular, computadora, televisor, y otros dispositivos eléctricos.",
    opciones: [
      { emoji: "📵", nombre: "0 horas", co2Dia: 0, label: "0 kg CO₂/día" },
      { emoji: "📱", nombre: "1–3 horas", co2Dia: 0.5, label: "0.5 kg CO₂/día" },
      { emoji: "💻", nombre: "4–6 horas", co2Dia: 1.1, label: "1.1 kg CO₂/día" },
      { emoji: "🖥️", nombre: "7–10 horas", co2Dia: 2.0, label: "2.0 kg CO₂/día" },
      { emoji: "🔌", nombre: "Más de 10 horas", co2Dia: 3.5, label: "+3.5 kg CO₂/día" }
    ]
  },
  {
    id: 2,
    categoria: "Alimentación",
    icono: "🥩",
    titulo: "¿Qué tan seguido comes carne roja?",
    hint: "Carne roja incluye res, cerdo y cordero. Es una de las categorías con mayor impacto ambiental.",
    opciones: [
      { emoji: "🥦", nombre: "Nunca", co2Dia: 0.1, label: "0.1 kg CO₂/día" },
      { emoji: "🍗", nombre: "1–2 veces por semana", co2Dia: 0.7, label: "0.7 kg CO₂/día" },
      { emoji: "🥩", nombre: "3–5 veces por semana", co2Dia: 1.5, label: "1.5 kg CO₂/día" },
      { emoji: "🍖", nombre: "Diario", co2Dia: 3.0, label: "3.0 kg CO₂/día" }
    ]
  },
  {
    id: 3,
    categoria: "Consumo",
    icono: "🛍️",
    titulo: "¿Con qué frecuencia compras ropa o electrónicos?",
    hint: "La industria textil y de electrónica son grandes generadoras de emisiones globales.",
    opciones: [
      { emoji: "🙅", nombre: "Casi nunca", co2Dia: 0.1, label: "0.1 kg CO₂/día" },
      { emoji: "🛒", nombre: "Ocasionalmente", co2Dia: 0.5, label: "0.5 kg CO₂/día" },
      { emoji: "🛍️", nombre: "Frecuentemente", co2Dia: 1.3, label: "1.3 kg CO₂/día" },
      { emoji: "🏪", nombre: "Muy frecuentemente", co2Dia: 2.5, label: "2.5 kg CO₂/día" }
    ]
  },
  {
    id: 4,
    categoria: "Reciclaje",
    icono: "♻️",
    titulo: "¿Qué tanto reciclas?",
    hint: "El reciclaje reduce las emisiones asociadas a la producción de nuevos materiales.",
    opciones: [
      { emoji: "♻️", nombre: "Siempre reciclo", co2Dia: 0.1, label: "0.1 kg CO₂/día" },
      { emoji: "🗑️", nombre: "A veces reciclo", co2Dia: 0.4, label: "0.4 kg CO₂/día" },
      { emoji: "❌", nombre: "Nunca reciclo", co2Dia: 1.0, label: "1.0 kg CO₂/día" }
    ]
  },
  {
    id: 5,
    categoria: "Energía en hogar",
    icono: "❄️",
    titulo: "¿Qué tanto usas aire acondicionado o calefacción?",
    hint: "Los sistemas de climatización son grandes consumidores de energía eléctrica.",
    opciones: [
      { emoji: "🌿", nombre: "Nunca", co2Dia: 0.0, label: "0 kg CO₂/día" },
      { emoji: "🌬️", nombre: "Poco", co2Dia: 0.7, label: "0.7 kg CO₂/día" },
      { emoji: "🌡️", nombre: "Moderadamente", co2Dia: 1.8, label: "1.8 kg CO₂/día" },
      { emoji: "🏠", nombre: "Mucho", co2Dia: 3.5, label: "3.5 kg CO₂/día" }
    ]
  }
];

// Nombres de categorías para mostrar en resultados
const categoriaNombres = [
  "Transporte",
  "Uso de electricidad",
  "Consumo de carne roja",
  "Compras y consumo",
  "Reciclaje",
  "Aire acond. / Calefacción"
];

// Emojis para las barras del desglose
const categoriaEmojis = ["🚗", "💻", "🥩", "🛍️", "♻️", "❄️"];

// Consejos personalizados por categoría dominante
const consejosPorCategoria = {
  0: {
    titulo: "Cambia tu forma de moverte",
    consejo: "Considera usar transporte público, compartir vehículo con compañeros de trabajo o usar bicicleta para trayectos cortos. Cada kilómetro sin auto individual puede reducir hasta 150g de CO₂."
  },
  1: {
    titulo: "Reduce el consumo energético",
    consejo: "Desconecta dispositivos cuando no los uses, activa el modo ahorro de energía en tus equipos y apaga completamente en lugar de dejar en standby. Pequeños hábitos marcan una gran diferencia."
  },
  2: {
    titulo: "Adopta una dieta más sostenible",
    consejo: "Reducir el consumo de carne roja a 1–2 veces por semana puede disminuir tu huella alimentaria hasta un 40%. Prueba proteínas de origen vegetal como lentejas, frijoles o soya."
  },
  3: {
    titulo: "Consume de forma consciente",
    consejo: "Antes de comprar, pregúntate si realmente lo necesitas. Compra ropa de segunda mano, repara electrónicos antes de reemplazarlos y prioriza marcas con certificación sostenible."
  },
  4: {
    titulo: "Recicla y reduce residuos",
    consejo: "Separa tus residuos en orgánico, reciclable y no reciclable. Compostear residuos orgánicos puede reducir emisiones de metano. Aplica las 3R: Reducir, Reutilizar, Reciclar."
  },
  5: {
    titulo: "Optimiza el uso del clima artificial",
    consejo: "Mantén el termostato entre 22–24°C en verano y 18–20°C en invierno. Sella ventanas y puertas para evitar fugas térmicas y usa ventiladores naturales cuando sea posible."
  }
};

// Clasificación por nivel según kg/día
const niveles = [
  { max: 3,  nivel: "Muy bajo",   clase: "nivel-muy-bajo",  emoji: "🌿", mensaje: "¡Excelente! Tu huella de carbono es muy baja." },
  { max: 7,  nivel: "Bajo",       clase: "nivel-bajo",      emoji: "🌱", mensaje: "Tu impacto ambiental está por debajo del promedio." },
  { max: 12, nivel: "Promedio",   clase: "nivel-promedio",  emoji: "🌍", mensaje: "Estás en el rango promedio global." },
  { max: 20, nivel: "Alto",       clase: "nivel-alto",      emoji: "⚠️", mensaje: "Tu huella de carbono es mayor al promedio." },
  { max: Infinity, nivel: "Muy alto", clase: "nivel-muy-alto", emoji: "🔴", mensaje: "Tu huella de carbono es muy alta. ¡Es momento de actuar!" }
];

// ---- ESTADO DE LA CALCULADORA ----
let preguntaActual = 0;
let respuestas = new Array(preguntas.length).fill(null); // Índice de opción seleccionada

// ---- REFERENCIAS DOM ----
const calcContainer = document.getElementById('calcContainer');
const resultadosSection = document.getElementById('resultados');
const stepItems = document.querySelectorAll('.step-item');

// ---- INICIALIZACIÓN ----
function init() {
  renderPregunta(0);
  actualizarPasos();
}

// ---- RENDERIZAR PREGUNTA ----
function renderPregunta(index) {
  // Eliminar panel activo anterior
  const panelAnterior = document.querySelector('.question-panel.active');
  if (panelAnterior) {
    panelAnterior.classList.remove('active');
    panelAnterior.style.display = 'none';
  }

  const pregunta = preguntas[index];
  const panelId = `panel-${index}`;
  let panel = document.getElementById(panelId);

  // Si el panel no existe, crearlo
  if (!panel) {
    panel = crearPanelPregunta(pregunta, index);
    calcContainer.appendChild(panel);
  }

  // Mostrar
  panel.style.display = 'block';
  panel.classList.add('active');

  // Restaurar selección previa si existe
  if (respuestas[index] !== null) {
    const opcionBtn = panel.querySelectorAll('.option-btn')[respuestas[index]];
    if (opcionBtn) {
      marcarOpcion(panel, respuestas[index]);
    }
  }

  // Actualizar estado de botones de navegación
  actualizarBotonesNav(panel, index);
}

// ---- CREAR PANEL HTML ----
function crearPanelPregunta(pregunta, index) {
  const panel = document.createElement('div');
  panel.className = 'question-panel';
  panel.id = `panel-${index}`;

  // Generar opciones HTML
  const opcionesHTML = pregunta.opciones.map((op, i) => `
    <button 
      class="option-btn" 
      data-value="${op.co2Dia}" 
      data-index="${i}"
      onclick="seleccionarOpcion(${index}, ${i}, this)"
      aria-label="${op.nombre}"
    >
      <span class="opt-emoji">${op.emoji}</span>
      <span class="opt-text">
        <span class="opt-name">${op.nombre}</span>
        <span class="opt-co2">${op.label}</span>
      </span>
      <span class="opt-check">✓</span>
    </button>
  `).join('');

  panel.innerHTML = `
    <div class="q-category">
      <span class="q-icon">${pregunta.icono}</span>
      ${pregunta.categoria}
    </div>
    <h2>${pregunta.titulo}</h2>
    <p class="q-hint">${pregunta.hint}</p>
    <div class="options-grid">
      ${opcionesHTML}
    </div>
    <div class="q-navigation">
      <button class="btn-prev" onclick="irAnterior()" ${index === 0 ? 'disabled' : ''}>
        ← Anterior
      </button>
      <span class="q-counter">
        <span>${index + 1}</span> / ${preguntas.length}
      </span>
      <button class="btn-next" onclick="irSiguiente(${index})" ${respuestas[index] === null ? 'disabled' : ''} id="btnNext-${index}">
        ${index === preguntas.length - 1 ? 'Ver resultados ✓' : 'Siguiente →'}
      </button>
    </div>
  `;

  return panel;
}

// ---- SELECCIONAR OPCIÓN ----
function seleccionarOpcion(preguntaIdx, opcionIdx, btnEl) {
  // Guardar respuesta
  respuestas[preguntaIdx] = opcionIdx;

  // Limpiar selecciones anteriores en este panel
  const panel = document.getElementById(`panel-${preguntaIdx}`);
  marcarOpcion(panel, opcionIdx);

  // Activar botón siguiente
  const btnNext = document.getElementById(`btnNext-${preguntaIdx}`);
  if (btnNext) btnNext.disabled = false;

  // Actualizar estado del paso
  actualizarPasos();
}

function marcarOpcion(panel, opcionIdx) {
  panel.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === opcionIdx);
  });
}

// ---- NAVEGACIÓN ----
function irSiguiente(currentIdx) {
  if (respuestas[currentIdx] === null) return;

  if (currentIdx === preguntas.length - 1) {
    // Mostrar resultados
    mostrarResultados();
  } else {
    preguntaActual = currentIdx + 1;
    renderPregunta(preguntaActual);
    actualizarPasos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function irAnterior() {
  if (preguntaActual > 0) {
    preguntaActual--;
    renderPregunta(preguntaActual);
    actualizarPasos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ---- ACTUALIZAR INDICADORES DE PASOS ----
function actualizarPasos() {
  stepItems.forEach((item, i) => {
    item.classList.remove('active', 'completed');
    if (i === preguntaActual) {
      item.classList.add('active');
    } else if (respuestas[i] !== null || i < preguntaActual) {
      item.classList.add('completed');
      const circle = item.querySelector('.step-circle');
      if (circle) circle.textContent = '✓';
    } else {
      const circle = item.querySelector('.step-circle');
      if (circle) circle.textContent = i + 1;
    }
  });
}

function actualizarBotonesNav(panel, index) {
  const btnPrev = panel.querySelector('.btn-prev');
  const btnNext = panel.querySelector(`#btnNext-${index}`);
  if (btnPrev) btnPrev.disabled = (index === 0);
  if (btnNext) btnNext.disabled = (respuestas[index] === null);
}

// ---- CALCULAR Y MOSTRAR RESULTADOS ----
function mostrarResultados() {
  // Ocultar calculadora, mostrar resultados
  calcContainer.style.display = 'none';
  resultadosSection.classList.add('visible');
  resultadosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Actualizar todos los pasos como completados
  stepItems.forEach((item, i) => {
    item.classList.remove('active');
    item.classList.add('completed');
    const circle = item.querySelector('.step-circle');
    if (circle) circle.textContent = '✓';
  });

  // Calcular totales
  const co2Dia = calcularCO2Dia();
  const co2Mes = co2Dia * 30;
  const co2Anio = co2Dia * 365;

  // Determinar nivel
  const nivelInfo = niveles.find(n => co2Dia <= n.max);

  // Encontrar categoría dominante
  const catValores = respuestas.map((respIdx, pregIdx) => {
    if (respIdx === null) return 0;
    return preguntas[pregIdx].opciones[respIdx].co2Dia;
  });
  const maxValor = Math.max(...catValores);
  const catDominante = catValores.indexOf(maxValor);

  // Renderizar resultados
  renderResultados(co2Dia, co2Mes, co2Anio, nivelInfo, catValores, catDominante);
}

function calcularCO2Dia() {
  return respuestas.reduce((total, respIdx, pregIdx) => {
    if (respIdx === null) return total;
    return total + preguntas[pregIdx].opciones[respIdx].co2Dia;
  }, 0);
}

function renderResultados(dia, mes, anio, nivelInfo, catValores, catDominante) {
  // --- Cabecera de resultado ---
  document.getElementById('resEmoji').textContent = nivelInfo.emoji;
  document.getElementById('resKgDia').textContent = `Generas aprox. ${dia.toFixed(1)} kg de CO₂ al día`;
  document.getElementById('resMensaje').textContent = nivelInfo.mensaje;
  document.getElementById('resNivel').textContent = nivelInfo.nivel;
  document.getElementById('resNivel').className = `result-nivel ${nivelInfo.clase}`;

  // --- Stats ---
  animarNumero(document.getElementById('statDia'), dia, 1);
  animarNumero(document.getElementById('statMes'), mes, 1);
  animarNumero(document.getElementById('statAnio'), Math.round(anio), 0);

  // --- Barras de desglose ---
  const maxVal = Math.max(...catValores, 0.1);
  const barsContainer = document.getElementById('barsContainer');
  barsContainer.innerHTML = '';

  catValores.forEach((val, i) => {
    const porcentaje = (val / maxVal) * 100;
    const esDominante = i === catDominante;
    const div = document.createElement('div');
    div.className = 'bar-item';
    div.innerHTML = `
      <div class="bar-header">
        <span class="bar-label">${categoriaEmojis[i]} ${categoriaNombres[i]}</span>
        <span class="bar-value">${val.toFixed(1)} kg/día${esDominante ? ' 🔺' : ''}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${esDominante ? 'dominant' : ''}" style="width: 0%" data-width="${porcentaje}%"></div>
      </div>
    `;
    barsContainer.appendChild(div);
  });

  // Animar las barras con delay
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width;
      }, i * 150);
    });
  }, 300);

  // --- Insight: categoría principal ---
  document.getElementById('mainSourceName').textContent = categoriaNombres[catDominante];
  document.getElementById('mainSourceDetail').textContent =
    `La categoría "${categoriaNombres[catDominante]}" representa ${((catValores[catDominante] / calcularCO2Dia()) * 100).toFixed(0)}% de tus emisiones diarias totales (${catValores[catDominante].toFixed(1)} kg CO₂/día).`;

  // --- Consejo personalizado ---
  const consejo = consejosPorCategoria[catDominante];
  document.getElementById('adviceTitle').textContent = consejo.titulo;
  document.getElementById('adviceText').textContent = consejo.consejo;
}

// Animar número del resultado
function animarNumero(el, target, decimals) {
  const duration = 1500;
  const start = performance.now();

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = current.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ---- REINICIAR CALCULADORA ----
function reiniciarCalculadora() {
  // Resetear estado
  preguntaActual = 0;
  respuestas = new Array(preguntas.length).fill(null);

  // Limpiar paneles creados
  calcContainer.innerHTML = '';
  calcContainer.style.display = 'block';
  resultadosSection.classList.remove('visible');

  // Re-inicializar
  init();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- ARRANQUE ----
document.addEventListener('DOMContentLoaded', init);
