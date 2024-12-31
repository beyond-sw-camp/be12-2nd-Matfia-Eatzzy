import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    productsBest: [],
    product: {
      productId: 0,
      productName: "",
      price: 0,
      image: "",
      expirationDate: "",
    },
    products: [],
    modifyProduct: {
      idx: 0,
      name: "",
      price: 0,
      stock: 0,
      expiration_date: "",
      cooking_time: 0,
      description: "",
      category: "",
      image: "",
    },
  }),
  actions: {
    async getProductBestList() {
      const response = await axios.get(
        "https://run.mocky.io/v3/9b0cb90a-9d78-42bf-8e24-531296905990"
      );

      this.productsBest = response.data;
    },

    async getProductsDetail(id) {
      const response = await axios.get(
        `https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/products/${id}`
      );
      this.product = response.data;
    },

    async getProductsList() {
      const response = await axios.get(
        "https://193e67e5-10ed-40ed-ad63-dc23723ce82b.mock.pstmn.io/products"
      );
      this.products = response.data;
    },

    async addProduct() {
      const response = await axios.post("/ysh/product/add", {
        name: "pizza",
        price: 16000,
        stock: 1,
        expiration_date: "2024-12-25",
        cooking_time: 10,
        category: "한식",
        description: "delicious pizza",
        image: "피자사진",
      });
      return response.data;
    },

    async ModifyProduct() {
      const response = await axios.post("/ysh/product/modify", {
        name: "pizza",
        price: 18000,
        stock: 3,
        description: "delicious pizza",
        image: "피사사진",
      });
      return response.data;
    },

    async RegisterDelivery() {
      const response = await axios.post("/ysh/product/delivery", {
        courier_company: "한진택배",
        tracking_number: 69012481,
        order_id: "ord2",
      });
      return response.data;
    },

    async getSellerProduct() {
      const response = await axios.get("/ysh/seller/product");
      return response.data;
    },

    async getOrderProduct() {
      const response = await axios.get("/ysh/order/product");
      return response.data;
    },

    async getOrderDetails() {
      const response = await axios.get("/ysh/order/details");
      return response.data;
    },

    setModifyProduct(productData) {
      this.modifyProduct = productData;
    },
  },
});
