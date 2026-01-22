/* =========================
   ESTADÍSTICAS GLOBALES
   (Fuente: GA4 + Rating)
========================= */

const globalStats = {
  calculations: 1240,      // GA4 - Recuento de eventos
  users: 85,              // GA4 - Usuarios que compararon
  rating: 4.8              // Rating promedio
};

/* =========================
   ANIMACIÓN DE CONTEO
========================= */

function animateCount(element, endValue, duration = 1000) {
  if (!element) return;

  const startValue = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easing suave (easeOut)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(
      startValue + (endValue - startValue) * easedProgress
    );

    element.innerText = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* =========================
   DATOS BASE
========================= */

const providers = [
  { name: 'Mercado Pago', rate: 0.035 },
  { name: 'Clip', rate: 0.036 },
  { name: 'Uala Bis', rate: 0.029 },
  { name: 'Zettle', rate: 0.035 }
];

const logoUrls = {
  'Mercado Pago': './logos/mercado-pago.png',
  'Clip': './logos/clip.png',
  'Uala Bis': './logos/uala-bis.png',
  'Zettle': './logos/zettle.png'
};

/* =========================
   CONTADORES (ANTES)
========================= */

let calcCount = parseInt(localStorage.getItem("calcCount")) || 0;

const calcCountEl = document.getElementById("calcCount");
if (calcCountEl) {
  calcCountEl.innerText = calcCount;
}

const providerCountEl = document.getElementById("providerCount");
if (providerCountEl) {
  providerCountEl.innerText = providers.length;
}


/* =========================
   FUNCIÓN PRINCIPAL
========================= */

function calculate() {

  const amount = parseFloat(document.getElementById('amount').value);
  const resultsDiv = document.getElementById('results');
  const ratingBtn = document.getElementById("ratingButton");

  if (!amount || amount <= 0) {
    resultsDiv.innerHTML =
      '<div class="alert alert-danger">Ingresa un monto válido.</div>';
    return;
  }
  
	  /* EVENTO GTM: cálculo realizado */
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
	  event: "calculo_realizado",
	  monto: amount
	});


  /* Contador de cálculos */
  calcCount++;
	localStorage.setItem("calcCount", calcCount);

	if (calcCountEl) {
	  calcCountEl.innerText = calcCount;
	}


  resultsDiv.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  
  document.getElementById("shareTool").style.display = "block";
  document.getElementById("ratingCard").style.display = "block";

  /* Cálculos */
  const results = providers.map(p => {
    const commission = amount * p.rate;
    const iva = commission * 0.16;
    const total = commission + iva;
    const net = amount - total;

    return { ...p, commission, iva, total, net };
  }).sort((a, b) => b.net - a.net);

  const bestIndex = 0;
  const worstIndex = results.length - 1;

  let html = '<h3 class="text-center mb-4">Comparativa completa</h3>';

  results.forEach((r, i) => {
    const isWinner = i === bestIndex;
    const isLoser = i === worstIndex;

    html += `
      <div class="card result-item
        ${isWinner ? 'winner' : ''}
        ${isLoser ? 'loser' : ''}">
        
        <div class="card-body d-flex align-items-center">

          <img src="${logoUrls[r.name]}" class="terminal-logo">

          <div class="result-content">

            <div class="result-left">
              ${isWinner ? '<span class="badge-winner">🏆 Más conveniente</span>' : ''}
              ${isLoser ? '<span class="badge-loser">⚠️ Mayor comisión</span>' : ''}
              
              <h5>${r.name}</h5>
              <p>
                Comisión (${(r.rate * 100).toFixed(2)}%): $${r.commission.toFixed(2)}<br>
                IVA (16%): $${r.iva.toFixed(2)}<br>
                <strong>Total comisión: $${r.total.toFixed(2)}</strong>
              </p>
            </div>

            <div class="result-net">
              <div class="label">Monto neto a recibir</div>
              <div class="amount">$${r.net.toFixed(2)}</div>
            </div>

          </div>
        </div>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}

/* =========================
   EVENTOS
========================= */

// Enter para calcular
document.getElementById("amount")?.addEventListener("keydown", e => {
  if (e.key === "Enter") calculate();
});

// Seleccionar monto al hacer focus
const amountInput = document.getElementById("amount");
amountInput?.addEventListener("focus", () => {
  amountInput.select();
});

// Scroll al inicio
document.getElementById("scrollTop")?.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Función para Compartir
function shareTool() {
  const url = window.location.href;
  const text = "Descubre qué terminal te deja más dinero en México 💳🇲🇽";

  if (navigator.share) {
    navigator.share({
      title: "Calculadora de comisiones",
      text: text,
      url: url
    });
  } else {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(whatsappUrl, "_blank");
  }
}


/* =========================
   PINTAR ESTADÍSTICAS
========================= */

function renderGlobalStats() {
  const calcEl = document.getElementById("calcCount");
  const usersEl = document.getElementById("usersCount");
  const ratingEl = document.getElementById("ratingValue");

  if (calcEl) {
    animateCount(calcEl, globalStats.calculations,);
  }

  if (usersEl) {
    animateCount(usersEl, globalStats.users,);
  }

  if (ratingEl) {
    ratingEl.innerText = `${globalStats.rating} / 5`;
  }
}

renderGlobalStats();


/* =========================
   DARK MODE (AUTO + MANUAL)
========================= */

const toggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.remove("theme-dark", "theme-light");

  if (theme) {
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  } else {
    localStorage.removeItem("theme");
  }

  // Actualizar icono si el botón existe
  if (toggleBtn) {
    toggleBtn.textContent =
      document.body.classList.contains("theme-dark") ? "☀️" : "🌙";
  }
}

// Al cargar la página
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Sin preferencia manual → sistema manda
  if (toggleBtn) toggleBtn.textContent = "🌙";
}

// Click del usuario
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  });
}

