const fs = require("fs");

// Exercise ProductManager.

class ProductManager {
  path; // The route of archive of products to generate
  products; // Products.

  constructor(path) {
    this.path = path;
    this.products = [];
    // If it doesn't exist the archive of products, create it.
    if (!fs.existsSync(this.path))
      fs.writeFile(this.path, this.products, (err) => {
        if (err) throw err;
        else console.log(`Archivo ${this.path} creado.`);
      });
  }

  // Add the product by parameter
  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  // Return all products.
  async getProducts() {
    await fs.readFile(this.path, "utf8", (err, data) => {
      // Transform the content JSON into a variable of memory.
      let data_archive = JSON.parse(data);
      // Add the array parse with the data in the archive a "this.products"
      this.products = data_archive;
    });
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

  updateProduct(id, new_data) {
    this.getProducts();
    let updateProd= this.getProductsById(id);
    if (updateProd != null) {
      // Obtiene las keys del objeto a actualizar, lo almaceno a keys array. 
      const keys = Object.keys(new_data);
      keys.forEach((key) => {
        update_the_product[key] = new_data[key];
      });
    }
  }
}

let productManager = new ProductManager("./productos.json");
console.log("===== Products =====");
productManager.addProduct({
  title: "Placa De Video Nvidia Asus TUF RTX 3080",
  description: "Placa De Video",
  code: "1822030398Q",
  thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_781239-MLA48656710911_122021-O.webp",
  price: 300000,
  stock: 20,
});
