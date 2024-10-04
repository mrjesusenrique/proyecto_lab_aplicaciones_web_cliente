import { aside } from "../aside/aside.js";

export const renderButtonShop = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // Crear el botón de la tienda
    const shopButton = document.createElement("button");
    shopButton.className = "btn-custom"; // Clase personalizada para el botón
    shopButton.setAttribute("aria-label", "Carrito de compras"); // Añadir atributo aria-label para accesibilidad

    // Crear el ícono del carrito
    const iconShopButton = document.createElement("i");
    iconShopButton.className = "fas fa-shopping-cart"; // Usar la clase Font Awesome para el ícono

    // Crear el badge de cantidad del carrito
    const cartQuantityBadge = document.createElement("span");
    cartQuantityBadge.className = "badge bg-danger rounded-pill ms-2"; // Clase para el badge
    cartQuantityBadge.textContent = "0"; // Inicializar cantidad en 0

    // Agregar el ícono y el badge al botón
    shopButton.appendChild(iconShopButton);
    shopButton.appendChild(cartQuantityBadge);

    // Agregar el botón al navbar
    document.querySelector("#navbar .navbar-nav").appendChild(shopButton);

    // Actualizar el ícono del carrito
    updateCartIcon();

    // Evento para mostrar el offcanvas al hacer clic en el botón
    shopButton.addEventListener("click", function () {
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasRight")
      );
      offcanvas.show();
      aside(); // Llama a la función aside() si está definida
    });

    // Observar cambios en el localStorage
    observeLocalStorageChange();
  });
};


export function updateCartIcon() {
  const productsInCart = JSON.parse(localStorage.getItem("productsCar")) || [];
  const cartQuantityBadge = document.querySelector(".badge");

  cartQuantityBadge.textContent = productsInCart.length;
  cartQuantityBadge.style.display =
    productsInCart.length > 0 ? "inline" : "none";
}

const observeLocalStorageChange = () => {
  updateCartIcon();

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key) {
    originalSetItem.apply(this, arguments);
    if (key === "productsCar") {
      updateCartIcon();
    }
  };
};
