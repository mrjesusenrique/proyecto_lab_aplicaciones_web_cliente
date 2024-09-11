export function aside() {
  let body = document.querySelector(".offcanvas-body");
  let producStorage = JSON.parse(localStorage.getItem("productsCar"));
  body.innerHTML = "";
  producStorage.map((p) => {
    let aside = `
                <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${p.image} class="img-fluid rounded-start" alt=${p.title}>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <span class="fs-4 fw-bold text-center mb-3"
                                id="price-${p.id}">
                                    $ ${p.price}
                                </span>
                                <div>
                                    <button type="button" class="btn btn-info"
                                    id="increase-${p.id}">+</button>
                                    <span class="mx-4 fs-5"
                                    id="quantity-${p.id}">${p.quantity}</span>
                                    <button type="button" class="btn btn-danger"
                                    id="decrease-${p.id}">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    setTimeout(() => {
      let btnIncrease = document.querySelector(`#increase-${p.id}`);
      let spanQuantity = document.querySelector(`#quantity-${p.id}`);
      let spanPrice = document.querySelector(`#price-${p.id}`);
      btnIncrease.onclick = () => {
        let objLocalStorage = JSON.parse(
          localStorage.getItem("productsCar")
        );
        let index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity = p.quantity + 1;
        spanQuantity.innerHTML = p.quantity;
        spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
        objLocalStorage[index] = p;
        localStorage.setItem(
          "productsCar",
          JSON.stringify(objLocalStorage)
        );
      };

      let btnDecrease = document.querySelector(`#decrease-${p.id}`);
      btnDecrease.onclick = () => {
        let objLocalStorage = JSON.parse(
          localStorage.getItem("productsCar")
        );
        let index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity = p.quantity - 1;
        debugger;
        if (p.quantity === 0) {
          objLocalStorage.splice(index, 1);
          let card = document.querySelector(`#card-${p.id}`);
          card.remove();
        } else {
          spanQuantity.innerHTML = p.quantity;
          spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
          objLocalStorage[index] = p;
        }
        localStorage.setItem(
          "productsCar",
          JSON.stringify(objLocalStorage)
        );
      };
    }, 0);

    body.innerHTML += aside;
  });
}
