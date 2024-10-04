const plantillaComprasEmpty = () => {
  return `
        <div class="alert alert-info text-center" role="alert">
          Tu lista de compras está vacía.
        </div>`;
};

export const asideCompras = () => {
  const body = document.querySelector(".offcanvas-body-compras");
  let listadoCompras = JSON.parse(localStorage.getItem("compras")) || [];
  body.innerHTML = "";

  if (listadoCompras.length === 0) {
    body.innerHTML = plantillaComprasEmpty();
    return;
  }

  listadoCompras.forEach((compra, index) => {
    const cardCompra = `
      <div class="card mb-3" style="max-width: 540px;" id="card-${
        compra.fecha
      }">
        <div class="row g-0">
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title text-center mb-3">Compra ${index + 1}</h5>
              <h6 class="text-center">Fecha: ${new Date(
                compra.fecha
              ).toLocaleString()}</h6>
              <h6 class="text-center">Total: $${compra.total.toFixed(2)}</h6>
              <hr>
              <div class="productos-list">
                ${compra.productos
                  .map(
                    (producto) => `
                  <div class="producto mb-3 d-flex align-items-center">
                    <img src="${
                      producto.image
                    }" class="img-thumbnail me-3" style="width: 75px;" alt="${
                      producto.title
                    }">
                    <div>
                      <h6 class="mb-1">${producto.title}</h6>
                      <p class="mb-1">Precio: $${producto.price.toFixed(2)}</p>
                      <p class="mb-1">Cantidad: ${producto.quantity}</p>
                      <p class="mb-1">Total: $${(
                        producto.price * producto.quantity
                      ).toFixed(2)}</p>
                      <p class="text-muted" style="font-size: 0.9em;">Rating: ${
                        producto.rating.rate
                      } (${producto.rating.count} reviews)</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    body.innerHTML += cardCompra;
  });
};

export const showAsideCompras = () => {
  document.addEventListener("DOMContentLoaded", function () {
    let buttonCompras = document.querySelector("#aside-compras");

    buttonCompras.addEventListener("click", function () {
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasRightCompras")
      );
      offcanvas.show();
      asideCompras();
    });
  });
};
