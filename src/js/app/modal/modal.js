import { showMessage } from "../showMessage/showMessage.js";

export const createModal = (product) => {
  const { id, description, image, title } = product;

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

  setTimeout(() => {
    let btnAddToCart = document.querySelector(`#add-to-cart-${id}`);
    btnAddToCart.onclick = () => {
      let objlocalStorage = JSON.parse(
        localStorage.getItem("productsCar")
      );
      let producExist = objlocalStorage.find((prod) => prod.id === id);
      let index = objlocalStorage.findIndex((prod) => prod.id === id);

      if (producExist) {
        producExist.quantity = producExist.quantity + 1;
        objlocalStorage[index] = producExist;
      } else {
        product.quantity = 1;
        objlocalStorage.push(product);
      };
      localStorage.setItem("productsCar", JSON.stringify(objlocalStorage));
      showMessage("Producto agregado al carrito");
      myModal.hide();
    };
  }, 0);

  const myModal = new bootstrap.Modal(modalContainer);
  myModal.show();
};
