// Exercise ProductManager.

class ProductManager {
  products; // Products.

  constructor() {
    this.products = [];
  }

  // Add the product by parameter
  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  // Return all products.
  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    let Found = this.products.find((product) => product.id === id);
    return Found ? Found : console.error("Not Found.");
  }
}

const products = [
  {
    title: "Placa De Video ASUS Rog Strix 3070ti",
    description: "Placa De Video",
    price: 201000, 
    code: "1822030398D",
    thumbnail:
    "https://http2.mlstatic.com/D_NQ_NP_644879-MLA48656467017_122021-O.webp",
    stock: 15,
  },
  {
    title: "Placa De Video MSI rtx 3050",
    description: "Placa De Video",
    code: "1822030398W",
    thumbnail:
      "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/video-geforce-rtx-3050-8gb-msi-gaming-x-0.jpg",
    price: 99000,
    stock: 7,
  },
  {
    title: "Placa De Video Nvidia Asus TUF RTX 3080",
      description: "Placa De Video",
    code: "1822030398Q",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_781239-MLA48656710911_122021-O.webp",
    price: 300000,
    stock: 20,
  },
  {
    title: "Procesador AMD Ryzen™ 7 5700G",
    description: "Procesador",
    code: "1822030398F",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_940934-MLU47593217192_092021-O.webp",
    price: 65000,
    stock: 6,
  },
  {
    title: "Procesador Intel Core i7-10700",
    description: "Procesador",
    code: "1822030398Y",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_729444-MLA42903822558_072020-O.webp",
    price: 70000,
    stock: 6,
  },
  {
    title: "Motherboard Asus Rog Strix B550-f",
    description: "Motherboard",
    code: "1822030398O",
    thumbnail:
      "https://mexx-img-2019.s3.amazonaws.com/Motherboard-Am4-Asus-Rog-Strix-B550-F-GAMING-WIFI-II_43255_1.jpeg",
    price: 54000,
    stock: 3,
  },
];

let productManager = new ProductManager();
products.forEach((product) => productManager.addProduct(product));
console.log("===== Products =====");
let allProducts = productManager.getProducts();
console.log(allProducts);
// findProduct works to place a value per parameter to be able to select the product ID
let findProduct = productManager.getProductsById(1);
console.log(findProduct);
