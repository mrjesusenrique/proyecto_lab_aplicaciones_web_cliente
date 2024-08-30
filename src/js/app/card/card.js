import { getProducts } from "../../api/api.js";

let cardContainer = document.querySelector("#template-card");

const createCards = () => {
  getProducts().then((data) => {
    data.map((product) => {
      const { image, title } = product;
      let card = `<div class="col" key="${title}">
                    <div class="card" style="height: 500px">
                      <img src=${image} class="card-img-top img-fluid object-fit-contain h-75" alt=${title}>
                      <div class="card-body text-center">
                        <h5 class="card-title">${title}</h5>
                      </div>
                    </div>
                  </div>`;
      cardContainer.innerHTML += card;
    });
  });
};

export default createCards;
