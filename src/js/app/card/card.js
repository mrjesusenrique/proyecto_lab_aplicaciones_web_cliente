import { getProducts } from "../../api/api.js";
import { createModal } from "../modal/modal.js";

let cardContainer = document.querySelector("#template-card");

const createCardElement = (product) => {
  const { id, image, title, price } = product;

  const card = document.createElement("div");
  card.classList.add("col");
  card.setAttribute("key", title);

  card.innerHTML = `
    <div class="d-flex flex-column card pt-5 pb-5" style="height: 550px">
      <img src="${image}" class="card-img-top img-fluid object-fit-contain h-75 p-2" alt="${title}" />
      <div class="card-body text-center">
        <h5 class="card-title">${title}</h5>
      </div>
      <div class="d-flex justify-content-center">
        <button
          id="btn-prod-${id}"
          type="button"
          class="btn btn-primary w-50 detailButton"
          data-product-title="${title}"
          data-product-price="${price}"
          data-product-image="${image}"
        >
          Detalle
        </button>
      </div>
    </div>
  `;
  return card;
};

export const createCards = () => {
  getProducts()
    .then((products) => {
      products.forEach((product) => {
        const cardElement = createCardElement(product);
        cardContainer.appendChild(cardElement);

        const btnProd = cardElement.querySelector(`#btn-prod-${product.id}`);
        if (btnProd) {
          btnProd.addEventListener("click", () => createModal(product));
        }
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
};
