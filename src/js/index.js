import { createCards } from "./app/card/card.js";
import { renderButtonShop } from "./app/shop/shop.js";
import { search } from "./app/search/search.js";
import { showAsideCompras } from "./app/asideCompras/asideCompras.js";
import { getCurrentYear } from "./app/footer/footer.js";

if (localStorage.getItem("productsCar") === null) {
  localStorage.setItem("productsCar", JSON.stringify([]));
}

if (localStorage.getItem("compras") === null) {
  localStorage.setItem("compras", JSON.stringify([]));
}

createCards();
search();
renderButtonShop();
showAsideCompras();
getCurrentYear();
