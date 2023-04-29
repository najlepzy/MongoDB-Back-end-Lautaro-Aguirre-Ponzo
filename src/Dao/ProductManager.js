import productSchema from "./models/ProductSchema.js";

class ProductManager {
  // Add the product by parameter
  async addProduct(data) {
    let result = await productSchema.create(data);
    return result;
  }

  // Return all products.
  async getProducts() {
    let products = await productSchema.find();
    return products;
  }

  async getProductsById(id) {
    const result = await productSchema.findOne({ _id: id });
    if (!result) {
      console.log("Product Not Found");
      return null;
    }
    return result;
  }

  async updateProduct(id, new_data) {
    delete new_data["id"];
    delete new_data["_id"];
    let result = await productSchema.updateOne({ _id: id }, new_data);
    return result;
  }

  async deleteProduct(id) {
    let result = await productSchema.deleteOne({ _id: id });
    return result;
  }
}

export default ProductManager;
