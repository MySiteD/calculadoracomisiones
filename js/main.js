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

function calculate() {
  const amount = parseFloat(document.getElementById('amount').value);
  const resultsDiv = document.getElementById('results');
  const summaryDiv = document.getElementById('summary');
  document.getElementById("results").scrollIntoView({
  behavior: "smooth",
  block: "start"
});

  if (!amount || amount <= 0) {
    resultsDiv.innerHTML = '<div class="alert alert-danger">Ingresa un monto válido.</div>';
    summaryDiv.innerHTML = '';
    return;
  }

  const results = providers.map(p => {
    const commission = amount * p.rate;
    const iva = commission * 0.16;
    const total = commission + iva;
    const net = amount - total;

    return { ...p, commission, iva, total, net };
  }).sort((a, b) => b.net - a.net);

  const best = results[0];

  summaryDiv.innerHTML = `
    <div class="summary-box">
      <h3>🏆 La terminal que más te conviene</h3>
      <p>
        <strong>${best.name}</strong> te deja
        <strong>$${best.net.toFixed(2)}</strong>
        por una venta de $${amount}
      </p>
    </div>
  `;

  let html = '<h3 class="text-center mb-4">Comparativa completa</h3>';

 results.forEach((r, i) => {
  html += `
    <div class="card result-item ${i === 0 ? 'winner' : ''}">
      <div class="card-body d-flex align-items-center">
        
        <img src="${logoUrls[r.name]}" class="terminal-logo">

        <div class="result-content">

          <div class="result-left">
            ${i === 0 ? '<span class="badge-winner">🏆 La que más te conviene</span>' : ''}
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

        </div> <!-- result-content -->

      </div> <!-- card-body -->
    </div> <!-- card -->
  `;
});


resultsDiv.innerHTML = html;
}
document.getElementById("amount").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    calculate();
  }
});

document.getElementById("scrollTop").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.getElementById("scrollTop").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Scroll suave al inicio
document.getElementById("scrollTop")?.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const amountInput = document.getElementById("amount");

amountInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    calculate();
  }
});
