import { createCards } from "./app/card/card.js";
import { renderButtonShop } from "./app/shop/shop.js";
import { search } from "./app/search/search.js";

if (localStorage.getItem("productsCar") === null) {
  localStorage.setItem("productsCar", JSON.stringify([]));
}

createCards();
search();
renderButtonShop();
