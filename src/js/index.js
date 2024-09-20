import { createCards } from "./app/card/card.js";
import { renderButtonShop } from "./app/shop/shop.js";

if (localStorage.getItem("productsCar") === null) {
  localStorage.setItem("productsCar", JSON.stringify([]));
}

createCards();
renderButtonShop();
