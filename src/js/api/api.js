import { errorToast } from "../../errorToast/errorToast.js";

export const getProducts = async () => {
  try {
    const products = await fetch("https://fakestoreapi.com/products");
    const data = await products.json();
    return data;
  } catch (error) {
    console.warn(`Error al obtener los productos ${error}`);
  }
};

export const getCategories = async () => {
  try {
    const categories = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await categories.json();
    return data;
  } catch (error) {
    errorToast(`Error al obtener las categorias ${error}`)
  }
};
