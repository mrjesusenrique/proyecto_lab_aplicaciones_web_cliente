import { getProducts } from "../../api/api.js";
import { createCardElement } from "../card/card.js";

let cardContainer = document.querySelector("#template-card");

export function search() {
    let input = document.querySelector("#search-input");

    input.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Obtener los productos desde la API
        getProducts().then((products) => {
            cardContainer.innerHTML = "";
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            );

            filteredProducts.forEach((product) => {
                const cardElement = createCardElement(product);
                cardContainer.appendChild(cardElement);

                const btnProd = cardElement.querySelector(`#btn-prod-${product.id}`);
                if (btnProd) {
                    btnProd.addEventListener("click", () => createModal(product));
                }
            });
            if (filteredProducts.length === 0) {
                cardContainer.innerHTML = `<p>No se encontraron productos</p>`;
            }
        });
    });
}