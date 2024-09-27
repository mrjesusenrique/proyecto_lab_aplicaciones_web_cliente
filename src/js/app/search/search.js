import { getProducts } from "../../api/api.js";
import { createCardElement, addDetailButtonListeners } from "../card/card.js";

let cardContainer = document.querySelector("#template-card");

export function search() {
    let input = document.querySelector("#search-input");

    input.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        getProducts().then((products) => {
            cardContainer.innerHTML = "";

            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            );

            filteredProducts.forEach((product) => {
                const cardElement = createCardElement(product);
                cardContainer.appendChild(cardElement);
            });

            addDetailButtonListeners(filteredProducts);
            if (filteredProducts.length === 0) {
                cardContainer.innerHTML = `<p>No se encontraron productos</p>`;
            }
        });
    });
}