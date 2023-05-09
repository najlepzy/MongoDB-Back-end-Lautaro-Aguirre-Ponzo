import CartSchema from "./models/CartSchema.js";

class CartManager {
  // Add the cart by parameter
  async addCart() {
    let result = await CartSchema.create();
    return result;
  }

  // Return all carts.
  async getCarts() {
     let carts = await CartSchema.find();
    return carts;
  }

  async getCartsById(id) {
   const result = await CartSchema.findOne({ _id: id });
    if (!result) {
      console.log("Cart Not Found");
      return null;
    }
    return result;
  }
  async addProductToCart(id, ProductId) {
    let Found = this.getCartsById(id);
    if (!Found) return false;
    let FoundProduct = Found.products.find(
      (product) => product.id === ProductId 
    );
    if (FoundProduct == null)
      Found.products.push({ id: ProductId, quantity: 1 });
    else FoundProduct.quantity++;
    delete Found["id"];
    delete Found["_id"];
    let result = await CartSchema.updateOne({ _id: id }, Found);
    return result;
  }
}


export default CartManager;
