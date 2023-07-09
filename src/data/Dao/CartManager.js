import CartSchema from "./models/CartSchema.js";
import TicketSchema from "./models/TicketSchema.js";
import UserManager from "./userManager.js";
import ProductSchema from "./models/ProductSchema.js";

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

    await foundCart.save();

    return true;
  }

  async completePurchase(cartId) {
    const foundCart = await this.getCartsById(cartId);
    if (!foundCart) return null;

    const products = foundCart.products;
    const purchasedProducts = [];
    const productsNotPurchased = [];

    for (const product of products) {
      const productId = product._id;
      const quantity = product.quantity;

      const productInStock = await ProductSchema.findOne({
        _id: productId,
        inStock: true,
      });

      if (!productInStock || productInStock.stock < quantity) {
        productsNotPurchased.push(productId);
        continue;
      }

      productInStock.stock -= quantity;
      await productInStock.save();
      purchasedProducts.push(product);
    }

    foundCart.products = productsNotPurchased;
    await foundCart.save();

    const userManager = new UserManager();
    const user = await userManager.getOne(foundCart.user);

    const ticket = new TicketSchema({
      code: this.generateUniqueCode(),
      purchase_datetime: Date.now(),
      amount: this.calculateTotalAmount(foundCart),
      purchaser: user.email,
    });
    await ticket.save();

    // Vaciar el carrito
    foundCart.products = [];
    await foundCart.save();

    return {
      cart: foundCart,
      productsNotPurchased: productsNotPurchased,
      ticket: ticket,
    };
  }

  generateUniqueCode(cartId) {
    return cartId.toString(); 
  }

  async calculateTotalAmount(cart) {
    let totalAmount = 0;

    for (const product of cart.products) {
      const productInStock = await ProductSchema.findOne({
        _id: product._id,
      });

      if (productInStock) {
        totalAmount += productInStock.price * product.quantity;
      }
    }

    return totalAmount;
  }
}

export default CartManager;
