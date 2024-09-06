export const renderButtonShop = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const shopButton = document.createElement("button");
    shopButton.className = "btn-custom";

    const iconShopButton = document.createElement("i");
    iconShopButton.className = "bi bi-cart-fill text-white";

    shopButton.appendChild(iconShopButton);

    document.querySelector("#navbar").appendChild(shopButton);
  });
};
