import CartSchema from "./models/CartSchema.js";
import TicketSchema from "./models/TicketSchema.js";
import UserManager from "./userManager.js";
import ProductSchema from "./models/ProductSchema.js"

class CartManager {
  async addCart() {
    let result = await CartSchema.create({});
    return result;
  }

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

  async completePurchase(cartId) {
    const foundCart = await this.getCartsById(cartId);
    if (!foundCart) return null;

    const products = foundCart.products;
    const purchasedProducts = [];

    for (const product of products) {
      const productId = product._id;
      const quantity = product.quantity;

      const productInStock = await ProductSchema.findOne({
        _id: productId,
        inStock: true,
      });

      if (!productInStock || productInStock.stock < quantity) {
        continue;
      }

      productInStock.stock -= quantity;
      await productInStock.save();
      purchasedProducts.push(product);
    }

    foundCart.products = purchasedProducts;
    await foundCart.save();

    const userManager = new UserManager();
    const user = await userManager.getOne(foundCart.user);
    const ticketManager = new TicketManager();
    const ticket = new TicketSchema({
      code: ticketManager.generateUniqueCode(),
      purchase_datetime: Date.now(),
      amount: calculateTotalAmount(foundCart),
      purchaser: user.email,
    });
    await ticket.save();

    return foundCart;
  }

  async addProductToCart(id, ProductId) {
    let foundCart = await this.getCartsById(id);
    if (!foundCart) return false;
    let productInStock = await ProductSchema.findOne({
      _id: ProductId,
      inStock: true,
    });
    if (!productInStock) {
      console.log("Product is out of stock");
      return false;
    }

    if (!foundCart.products) foundCart.products = [];

    let foundIndex = foundCart.products.findIndex(
      (product) => product._id === ProductId
    );

    if (foundIndex < 0) {
      foundCart.products.push({ _id: ProductId, quantity: 1 });
    } else {
      foundCart.products[foundIndex].quantity++;
    }

    let result = await CartSchema.updateOne(
      { _id: id },
      { $set: { products: foundCart.products } }
    );

    if (result && foundIndex >= 0) {
      const userManager = new UserManager();
      const user = await userManager.getOne(foundCart.user);
      const ticketManager = new TicketManager();
      const ticket = new TicketSchema({
        code: ticketManager.generateUniqueCode(),
        purchase_datetime: Date.now(),
        amount: calculateTotalAmount(foundCart),
        purchaser: user.email,
      });
      await ticket.save();
    }

    return result;
  }
}

export default CartManager;
