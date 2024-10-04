import { aside } from "../aside/aside.js";

export const renderButtonShop = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const shopButton = document.createElement("button");
    shopButton.className = "btn-custom";
    shopButton.style = "width: 65px;"
    shopButton.setAttribute("aria-label", "Carrito de compras");

    const iconShopButton = document.createElement("i");
    iconShopButton.className = "fas fa-shopping-cart";

    const cartQuantityBadge = document.createElement("span");
    cartQuantityBadge.className = "badge bg-danger rounded-pill ms-2";
    cartQuantityBadge.textContent = "0";

    shopButton.appendChild(iconShopButton);
    shopButton.appendChild(cartQuantityBadge);

    document.querySelector("#navbar .navbar-nav").appendChild(shopButton);

    updateCartIcon();

    shopButton.addEventListener("click", function () {
      const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasRight")
      );
      offcanvas.show();
      aside();
    });

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
