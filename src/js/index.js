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

document.addEventListener("DOMContentLoaded", function () {
  function init() {
    var tema = localStorage.getItem("tema");
    cambiarTema(tema || "light"); // Si no hay tema en localStorage, aplica el tema claro por defecto
  }

  function cambiarTema(tema) {
    switch (tema) {
      case "dark":
        localStorage.setItem("tema", 'dark');
        document.getElementById("btn-dark").style.display = "none";
        document.getElementById("btn-light").style.display = "block";
        document.documentElement.setAttribute("data-theme", "dark");
  
        // Cambiar el fondo de las tarjetas
        document.querySelectorAll('.theme-card').forEach(card => {
          card.classList.add('dark-theme');
        });
        break;
      default:
        localStorage.setItem("tema", 'light');
        document.getElementById("btn-dark").style.display = "block";
        document.getElementById("btn-light").style.display = "none";
        document.documentElement.setAttribute("data-theme", "light");
  
        // Cambiar el fondo de las tarjetas
        document.querySelectorAll('.theme-card').forEach(card => {
          card.classList.remove('dark-theme');
        });
        break;
    }
  }
  

  // Llama a la función init() para establecer el tema actual
  init();

  // Hacer que los botones de cambio de tema funcionen
  document.getElementById("btn-dark").addEventListener("click", function () {
    cambiarTema("dark");
  });

  document.getElementById("btn-light").addEventListener("click", function () {
    cambiarTema("light");
  });
});


createCards();
search();
renderButtonShop();
showAsideCompras();
getCurrentYear();
