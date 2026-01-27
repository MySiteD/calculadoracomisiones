const container = document.getElementById("promoContainer");
const search = document.getElementById("promoSearch");

function renderPromos(list) {

  container.innerHTML = "";

  list
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach(promo => {

      container.innerHTML += `
        <div class="col-md-4">

          <article class="promo-card">

            <header class="promo-top">

              ${promo.logo ? `<img src="${promo.logo}" alt="${promo.titulo}">` : ""}

              <time>
                ${new Date(promo.fecha).toLocaleDateString("es-MX")}
              </time>

            </header>

            <h5>${promo.titulo}</h5>

            <p>${promo.descripcion}</p>

            <a href="${promo.link}"
               target="_blank"
               class="btn btn-success w-100">
              Ver promoción
            </a>

          </article>

        </div>
      `;
    });
}

renderPromos(promociones);

search.addEventListener("input", e => {

  const term = e.target.value.toLowerCase();

  const filtered = promociones.filter(p =>
    p.titulo.toLowerCase().includes(term) ||
    p.descripcion.toLowerCase().includes(term)
  );

  renderPromos(filtered);
});
