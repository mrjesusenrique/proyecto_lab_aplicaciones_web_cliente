import { showMessage } from "../showMessage/showMessage.js";
import { updateCartIcon } from "../shop/shop.js";

const plantillaCarEmpty = () => {
  return `
      <div class="alert alert-info text-center" role="alert">
        Tu carrito está vacío.
      </div>`;
};

export const aside = () => {
  const body = document.querySelector(".offcanvas-body");
  const producStorage = JSON.parse(localStorage.getItem("productsCar")) || [];
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  body.innerHTML = "";

  if (producStorage.length === 0) {
    body.innerHTML = plantillaCarEmpty();
    totalPrice.innerHTML = "";
    return;
  }

  if (producStorage.length) {
    let btnsCart = document.querySelector("#btns-cart");
    btnsCart.style.display = "block";
  }

  producStorage.forEach((p) => {
    const aside = `
      <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${p.image}" class="img-fluid rounded-start" alt="${
      p.title
    }">
          </div>
          <div class="col-md-8">
            <div class="card-body
 d-flex flex-column justify-content-center align-items-center">
              <h5 class="card-title
 text-center mb-3">${
   p.title
 }</h5> <span class="fs-4 fw-bold text-center mb-3" id="price-${p.id}">
                $ ${p.price * p.quantity}
              </span>
              <div id="buttons-${p.id}">
                ${
                  p.quantity === 1
                    ? `<button type="button" class="btn btn-danger" id="delete-${p.id}">Eliminar</button>`
                    : `<button type="button" class="btn btn-danger" id="decrease-${p.id}">-</button>`
                }
                <span class="mx-4 fs-5" id="quantity-${p.id}">${
      p.quantity
    }</span>
                <button type="button" class="btn btn-info" id="increase-${
                  p.id
                }">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    total += p.price * p.quantity;
    totalPrice.innerHTML = "Total: $" + total;
    body.innerHTML += aside;

    setTimeout(() => {
      const spanQuantity = document.querySelector(`#quantity-${p.id}`);
      const spanPrice = document.querySelector(`#price-${p.id}`);
      const buttonsContainer = document.querySelector(`#buttons-${p.id}`);

      const updateButtons = () => {
        if (p.quantity === 1) {
          buttonsContainer.innerHTML = `
            <button type="button" class="btn btn-danger" id="delete-${p.id}">Eliminar</button>
            <span class="mx-4 fs-5" id="quantity-${p.id}">${p.quantity}</span>
            <button type="button" class="btn btn-info" id="increase-${p.id}">+</button>
          `;
          document.querySelector(`#delete-${p.id}`).onclick = deleteProduct;
        } else {
          buttonsContainer.innerHTML = `
            <button type="button" class="btn btn-danger" id="decrease-${p.id}">-</button>
            <span class="mx-4 fs-5" id="quantity-${p.id}">${p.quantity}</span>
            <button type="button" class="btn btn-info" id="increase-${p.id}">+</button>
          `;
          document.querySelector(`#decrease-${p.id}`).onclick =
            decreaseQuantity;
        }
        document.querySelector(`#increase-${p.id}`).onclick = increaseQuantity;
        calcularTotal();
      };

      const increaseQuantity = () => {
        const objLocalStorage = JSON.parse(localStorage.getItem("productsCar"));
        const index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity += 1;
        spanQuantity.innerHTML = p.quantity;
        spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
        objLocalStorage[index] = p;
        localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
        updateButtons();
        calcularTotal();
      };

      const decreaseQuantity = () => {
        const objLocalStorage = JSON.parse(localStorage.getItem("productsCar"));
        const index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        p.quantity -= 1;
        if (p.quantity === 0) {
          deleteProduct();
        } else {
          spanQuantity.innerHTML = p.quantity;
          spanPrice.innerHTML = `$ ${p.price * p.quantity}`;
          objLocalStorage[index] = p;
          localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
          updateButtons();
        }
        calcularTotal();
      };

      const deleteProduct = () => {
        // no se está borrando el producto[0] de una lista del mismo producto
        const objLocalStorage = JSON.parse(localStorage.getItem("productsCar"));
        const index = objLocalStorage.findIndex((prod) => prod.id === p.id);
        objLocalStorage.splice(index, 1);
        document.querySelector(`#card-${p.id}`).remove();
        if (objLocalStorage.length === 0) {
          body.innerHTML = plantillaCarEmpty();
          console.log("eliminar");
          let btnsCart = document.querySelector("#btns-cart");
          btnsCart.style.display = "none";
        }
        localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
        showMessage("Producto eliminado del carrito");
        setTimeout(() => {
          calcularTotal();
        }, 10);
      };
      updateButtons();
    }, 0);
  });

  function calcularTotal() {
    let total = 0;
    const totalPrice = document.querySelector("#totalPrice");
    let arrayProducts = JSON.parse(localStorage.getItem("productsCar"));

    if (arrayProducts != [] && arrayProducts != null) {
      arrayProducts.forEach((p) => {
        total += p.price * p.quantity;
      });
      if (total == 0) {
        totalPrice.innerHTML = "";
      } else {
        totalPrice.innerHTML = "Total: $" + total.toFixed(2);
      }
    } else {
      totalPrice.innerHTML = "";
    }
  }

  const addCompra = () => {
    let comprasExistentes = JSON.parse(localStorage.getItem("compras")) || [];
    let arrayProducts = JSON.parse(localStorage.getItem("productsCar")) || [];

    const totalCompra = arrayProducts.reduce(
      (total, producto) => total + producto.price * producto.quantity,
      0
    );

    const nuevaCompra = {
      productos: arrayProducts,
      total: totalCompra,
      fecha: new Date().toISOString(),
    };

    comprasExistentes.push(nuevaCompra);
    const comprasJSON = JSON.stringify(comprasExistentes);
    localStorage.setItem("compras", comprasJSON);
  };

  let btnFinalizar = document.querySelector("#btn-finalizar");

  btnFinalizar.onclick = () => {
    addCompra();
    localStorage.removeItem("productsCar");
    body.innerHTML = plantillaCarEmpty();
    let btnsCart = document.querySelector("#btns-cart");
    btnsCart.style.display = "none";
    updateCartIcon();
    calcularTotal();
    showMessage("¡Compra exitosa!");
  };

  let btnCancelar = document.querySelector("#btn-cancelar");

  btnCancelar.onclick = () => {
    localStorage.removeItem("productsCar");
    body.innerHTML = plantillaCarEmpty();
    let btnsCart = document.querySelector("#btns-cart");
    btnsCart.style.display = "none";
    updateCartIcon();
    calcularTotal();
    showMessage("Has cancelado la compra");
  };
};
