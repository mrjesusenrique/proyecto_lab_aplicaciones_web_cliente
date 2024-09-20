const plantillaCarEmpty = () => {
  return `
      <div class="alert alert-info text-center" role="alert">
        Tu carrito está vacío.
      </div>`;
};

export const aside = () => {
  const body = document.querySelector(".offcanvas-body");
  const producStorage = JSON.parse(localStorage.getItem("productsCar")) || [];
  body.innerHTML = "";

  if (producStorage.length === 0) {
    body.innerHTML = plantillaCarEmpty();
    return;
  }

  producStorage.forEach((p) => {
    const aside = `
      <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${p.image}" class="img-fluid rounded-start" alt="${p.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <span class="fs-4 fw-bold text-center mb-3" id="price-${p.id}">
                $ ${p.price}
              </span>
              <div>
                <button type="button" class="btn btn-info" id="increase-${p.id}">+</button>
                <span class="mx-4 fs-5" id="quantity-${p.id}">${p.quantity}</span>
                <button type="button" class="btn btn-danger" id="decrease-${p.id}">-</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    body.innerHTML += aside;

    setTimeout(() => {
      const btnIncrease = document.querySelector(`#increase-${p.id}`);
      const spanQuantity = document.querySelector(`#quantity-${p.id}`);
      const spanPrice = document.querySelector(`#price-${p.id}`);

      btnIncrease.onclick = () => {
        const objLocalStorage = JSON.parse(localStorage.getItem("productsCar"));
        const index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity += 1;
        spanQuantity.innerHTML = p.quantity;
        spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
        objLocalStorage[index] = p;
        localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
      };

      const btnDecrease = document.querySelector(`#decrease-${p.id}`);
      btnDecrease.onclick = () => {
        const objLocalStorage = JSON.parse(localStorage.getItem("productsCar"));
        const index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity -= 1;

        if (p.quantity === 0) {
          objLocalStorage.splice(index, 1);
          document.querySelector(`#card-${p.id}`).remove();

          if (objLocalStorage.length === 0) {
            body.innerHTML = plantillaCarEmpty();
          }
        } else {
          spanQuantity.innerHTML = p.quantity;
          spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
          objLocalStorage[index] = p;
        }
        localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
      };
    }, 0);
  });
};
