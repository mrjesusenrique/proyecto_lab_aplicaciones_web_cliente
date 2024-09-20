import { aside } from "../aside/aside.js";

export const renderButtonShop = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const shopButton = document.createElement("button");
    shopButton.className = "btn-custom";

    const iconShopButton = document.createElement("i");
    iconShopButton.className = "bi bi-cart-fill text-white";
    shopButton.appendChild(iconShopButton);
    document.querySelector("#navbar").appendChild(shopButton);

    updateCartIcon(iconShopButton);

    shopButton.addEventListener("click", function () {
      const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight"));
      offcanvas.show();
      aside();
    });

    observeLocalStorageChange(iconShopButton);
  });
};

const updateCartIcon = (iconElement) => {
  const productsInCart = JSON.parse(localStorage.getItem("productsCar")) || [];

  if (productsInCart.length > 0) {
    iconElement.className = "bi bi-cart-check-fill text-white";
  } else {
    iconElement.className = "bi bi-cart-fill text-white";
  }
};

const observeLocalStorageChange = (iconElement) => {
  updateCartIcon(iconElement);

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key) {
    originalSetItem.apply(this, arguments);
    if (key === "productsCar") {
      updateCartIcon(iconElement);
    }
  };
};
