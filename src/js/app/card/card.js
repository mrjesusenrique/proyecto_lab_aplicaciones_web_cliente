import { getProducts } from "../../api/api.js";

let cardContainer = document.querySelector("#template-card");

const createCards = () => {
  getProducts().then((data) => {
    data.map((product) => {
      const { image, title } = product;
      let card = `
        <div class="col" key="${title}">
          <div class="d-flex flex-column card pt-5 pb-5" style="height: 550px">
            <img src=${image} class="card-img-top img-fluid object-fit-contain h-75 p-2" alt=${title} />
            <div class="card-body text-center">
              <h5 class="card-title">${title}</h5>
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-primary w-50"
                data-product-title="${title}"
              >
                Detalle
              </button>
            </div>
          </div>
        </div>`;

      cardContainer.innerHTML += card;
    });

    const buttons = cardContainer.querySelectorAll(".btn-primary");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const productTitle = button.dataset.productTitle;
        handleProductClick(productTitle);
      });
    });
  });
};

function handleProductClick(productTitle) {
  const boton = document.getElementById("detailModal");
  const eventoClic = new MouseEvent("click");
  boton.dispatchEvent(eventoClic);
}

export default createCards;
