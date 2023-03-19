const fs = require("fs");

// Exercise ProductManager.

class ProductManager {
  path; // The route of archive of products to generate
  products; // Products.

  __writeToFile() {
    const file = fs.writeFileSync(
      this.path,
      JSON.stringify(this.products, null, 4)
    );
    if (!fs.existsSync(this.path)) throw `Error writting to file ${this.path}`;
    console.log("Written into " + this.path);
  }

  constructor(path) {
    this.path = path;
    this.products = [];
    // If it doesn't exist the archive of products, create it.
    if (!fs.existsSync(this.path)) {
      this.__writeToFile();
    }
  }

  // Add the product by parameter
  addProduct(product) {
    this.getProducts();
    product.id =
      this.products.length == 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    this.products.push(product);
    this.__writeToFile();
  }

  // Return all products.
  getProducts() {
    const file = fs.readFileSync(this.path, "utf8");
    this.products = JSON.parse(file);
    if (!this.products) this.products = [];
    return this.products;
  }

  getProductsById(id) {
    this.getProducts();
    let Found = this.products.find((product) => product.id === id);
    if (!Found) {
      console.log("Product Not Found");
      return null;
    }
    return Found;
  }

  // Add the product by parameter
  addProduct(product) {
    this.getProducts();
    product.id =
      this.products.length == 0
        ? 1
        : this.products[this.products.length - 1].id + 1;
    this.products.push(product);
    this.__writeToFile();
  }

  updateProduct(id, new_data) {
    this.getProducts();
    let updateProd = this.getProductsById(id);
    if (updateProd != null) {
      // Gets the keys of the object to update
      const keys = Object.keys(new_data);
      keys.forEach((key) => {
        if (key != "id") updateProd[key] = new_data[key];
      });
      this.__writeToFile();
    }
  }

  deleteProduct(id) {
    this.getProducts();
    let index_found = this.products.findIndex((product) => product.id === id);
    if (index_found > -1) {
      this.products.splice(index_found, 1);
      this.__writeToFile();
    }
  }
}

let productManager = new ProductManager("./products.json");
let products = productManager.getProducts();
console.log("===== Existing Products =====");
console.log(products);
console.log("===== Adds a product to the array =====");
productManager.addProduct({
  title: "Graphics Card Nvidia Asus TUF RTX 3080",
  description: "Graphics Card",
  code: "1822030398Q",
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_781239-MLA48656710911_122021-O.webp",
  price: 300000,
  stock: 20,
});
productManager.addProduct({
  title: "Graphics Card Nvidia Asus TUF RTX 3080",
  description: "Graphics Card",
  code: "1822030398Q",
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_781239-MLA48656710911_122021-O.webp",
  price: 300000,
  stock: 20,
});
productManager.addProduct({
  title: "CPU AMD Ryzen™ 7 5700G",
  description: "CPU",
  code: "7252855344M",
  stock: 6,
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_940934-MLU47593217192_092021-O.webp",
  price: 65000,
});
console.log("===== New Product in List =====");
products = productManager.getProducts();
console.log(products);
console.log("===== Updates code of all products in the array =====");
products.forEach((item) => {
  productManager.updateProduct(item.id, {
    code:
      "" +
      (Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000) +
        "L"),
  });
});
console.log("===== Updated Products in List =====");
products = productManager.getProducts();
console.log(products);
console.log("===== Deletes Product in List using random id =====");
let id_to_delete = Math.floor(Math.random() * 0 + products.length);
console.log("Deleting product with id: " + id_to_delete);
productManager.deleteProduct(id_to_delete);
console.log("===== Updated Products in List =====");
products = productManager.getProducts();
console.log(products);
