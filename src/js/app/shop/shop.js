import { aside } from "../aside/aside.js";

export const renderButtonShop = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const shopButton = document.createElement("button");
    shopButton.className = "btn-custom";

    const iconShopButton = document.createElement("i");
    iconShopButton.className = "bi bi-cart-fill text-white";

    const cartQuantityBadge = document.createElement("span");
    cartQuantityBadge.className = "badge bg-danger rounded-pill ms-2";
    shopButton.appendChild(iconShopButton);
    shopButton.appendChild(cartQuantityBadge);

    document.querySelector("#navbar").appendChild(shopButton);

    updateCartIcon();

    shopButton.addEventListener("click", function () {
      const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight"));
      offcanvas.show();
      aside();
    });

    observeLocalStorageChange(cartQuantityBadge);
  });
};

export function updateCartIcon() {
  const productsInCart = JSON.parse(localStorage.getItem("productsCar")) || [];
  const cartQuantityBadge = document.querySelector(".badge");

  cartQuantityBadge.textContent = productsInCart.length;
  cartQuantityBadge.style.display = productsInCart.length > 0 ? "inline" : "none";
}

const observeLocalStorageChange = (cartQuantityBadge) => {
  updateCartIcon(cartQuantityBadge);

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key) {
    originalSetItem.apply(this, arguments);
    if (key === "productsCar") {
      updateCartIcon(cartQuantityBadge);
    }
  };
};