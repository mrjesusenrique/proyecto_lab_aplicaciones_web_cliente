import { showMessage } from "../showMessage/showMessage.js";

export const createModal = (product) => {
  const { id, description, image, title, price } = product;

  let modalQuantity = 1; // Default quantity

  let modal = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          ${title}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img id="modal-img" src=${image} class="img-fluid rounded-start" alt=${title}>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <p class="card-text" id="modal-description">
                  ${description}
                </p>
                <h5 class="card-title text-center mb-3" id="modal-price">
                  $${price}
                </h5>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span>Cantidad:</span>
                  <div class="d-flex align-items-center">
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="decrease-quantity">-</button>
                    <span class="mx-2" id="current-quantity">${modalQuantity}</span>
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="increase-quantity">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button title="Add to cart" type="button" class="btn btn-primary" id="add-to-cart-${id}">Añadir a carrito</button>
      </div>
    </div>
  </div>`;

  let modalContainer = document.querySelector("#staticBackdrop");
  modalContainer.innerHTML = modal;

  const decreaseButton = document.getElementById("decrease-quantity");
  const increaseButton = document.getElementById("increase-quantity");
  const quantitySpan = document.getElementById("current-quantity");

  decreaseButton.addEventListener("click", () => {
    if (modalQuantity > 1) {
      modalQuantity--;
      quantitySpan.textContent = modalQuantity;
    }
  });

  increaseButton.addEventListener("click", () => {
    modalQuantity++;
    quantitySpan.textContent = modalQuantity;
  });

  setTimeout(() => {
    let btnAddToCart = document.querySelector(`#add-to-cart-${id}`);
    btnAddToCart.onclick = () => {
      let objLocalStorage = JSON.parse(localStorage.getItem("productsCar")) || [];
      let productExists = objLocalStorage.find((prod) => prod.id === id);
      let index = objLocalStorage.findIndex((prod) => prod.id === id);

      if (productExists) {
        productExists.quantity += modalQuantity;
      } else {
        product.quantity = modalQuantity;
        objLocalStorage.push(product);
      }

      localStorage.setItem("productsCar", JSON.stringify(objLocalStorage));
      showMessage("Producto agregado al carrito");
      myModal.hide();
    };
  }, 0);

  const myModal = new bootstrap.Modal(modalContainer);
  myModal.show();
};