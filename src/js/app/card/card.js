import { getProducts } from "../../api/api.js";

let cardContainer = document.querySelector("#template-card");

const createCards = () => {
  getProducts().then((data) => {
    data.map((product, i) => {
      const { image, title, price } = product;
      let card = `
        <div class="col" key="${title}">
          <div class="d-flex flex-column card pt-5 pb-5" style="height: 550px">
            <img src=${image} class="card-img-top img-fluid object-fit-contain h-75 p-2" alt=${title} />
            <div class="card-body text-center">
              <h5 class="card-title">${title}</h5>
            </div>
            <div class="d-flex justify-content-center">
              <button
                id="button_${i}"
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
        </div>`;

      cardContainer.innerHTML += card;
    });

    const buttons = cardContainer.querySelectorAll(".detailButton");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const productTitle = button.dataset.productTitle;
        const productPrice = button.dataset.productPrice;
        const productImage = button.dataset.productImage;

        handleProductClick(productTitle, productPrice, productImage);
      });
    });
  });
};

const handleProductClick = (productTitle, productPrice, productImage) => {
  const boton = document.getElementById("detailModal");
  const eventoClic = new MouseEvent("click");
  boton.dispatchEvent(eventoClic);

  const headerModalTitle = document.querySelector("#headerModalLabel");
  headerModalTitle.textContent = productTitle;

  const modalImage = document.querySelector("#modalImage");
  modalImage.src = productImage;
  modalImage.alt = productTitle;
  modalImage.title = productTitle;

  const modalPrice = document.querySelector("#modalPrice");
  modalPrice.textContent = `$${productPrice}`;

  const addProductButton = document.querySelector("#addProduct");
  addProductButton.addEventListener("click", () => {
    const product = {
      title: productTitle,
      price: productPrice,
      image: productImage,
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));
  });
};

export default createCards;
