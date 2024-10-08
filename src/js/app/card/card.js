import { getProducts } from "../../api/api.js";
import { createModal } from "../modal/modal.js";
import { errorToast } from "../../../errorToast/errorToast.js";

let cardContainer = document.querySelector("#template-card");

export const createCardElement = (product) => {
  const { id, image, title, price } = product;

  const card = document.createElement("div");
  card.classList.add("col");
  card.setAttribute("key", title);

  card.innerHTML = `
  <div class="d-flex flex-column card pt-5 pb-5 theme-card" title="${title}" style="height: 550px">
    <img src="${image}" class="card-img-top img-fluid object-fit-contain h-75 p-2" alt="${title}" />
    <div class="card-body text-center">
      <h5 class="card-title text-truncate" data-bs-toggle="tooltip" data-bs-placement="bottom" >
        ${title}
      </h5>
      <p class="card-text fw-bold">$${price}</p>
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

export const addDetailButtonListeners = (products) => {
  products.forEach((product) => {
    const btnProd = document.querySelector(`#btn-prod-${product.id}`);
    if (btnProd) {
      btnProd.addEventListener("click", () => createModal(product));
    }
  });
};

export const createCards = () => {
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "block";

  getProducts()
    .then((products) => {
      spinner.style.display = "none";
      products.forEach((product) => {
        const cardElement = createCardElement(product);
        cardContainer.appendChild(cardElement);
      });

      addDetailButtonListeners(products);
    })
    .catch((error) => {
      spinner.style.display = "none";
      errorToast(`Error al obtener las categorias ${error}`);
    });
};
