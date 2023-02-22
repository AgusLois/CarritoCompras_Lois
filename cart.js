class Product {
  constructor(name, price, img, type) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.type = type;
  }
}

let listCart = [];

function preChargeListCart() {
  let localProducts = localStorage.getItem("products");
  let productsJSON = JSON.parse(localProducts);
  if (localProducts !== null) {
    for (const productJSON of productsJSON) {
      listCart.push(
        new Product(
          productJSON.name,
          productJSON.price,
          productJSON.img,
          productJSON.type
        )
      );
    }
  }
}

function renderProducts() {
  listCart.forEach((product) => {
    const div = document.createElement("div");
    div.className = "col-xl-3 col-md-4 col-6";
    const divCard = document.createElement("div");
    divCard.className = "card";
    const imgCard = document.createElement("img");
    imgCard.className = "imgCard";
    imgCard.src = product.img;

    const nameProduct = document.createElement("h4");
    nameProduct.innerHTML = product.name;
    const priceProduct = document.createElement("h2");
    priceProduct.innerHTML = "$" + product.price;

    divCard.append(imgCard);
    divCard.append(nameProduct);
    divCard.append(priceProduct);
    div.append(divCard);
    cartDiv.append(div);
  });
}

preChargeListCart();
renderProducts();
