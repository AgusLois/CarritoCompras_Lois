class Product {
  constructor(name, price, img, type) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.type = type;
  }
}

let listProduct = [];
let listCart = [];

function preChargeProducts() {
  listProduct.push(
    new Product(
      "Gorra",
      200,
      "https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
  listProduct.push(
    new Product(
      "Zapatillas",
      1000,
      "https://images.pexels.com/photos/8079829/pexels-photo-8079829.jpeg?auto=compress&cs=tinysrgb&w=600",
      "shoes"
    )
  );
  listProduct.push(
    new Product(
      "Bermuda Jean",
      500,
      "https://images.pexels.com/photos/6995860/pexels-photo-6995860.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
  listProduct.push(
    new Product(
      "Anillo",
      50,
      "https://images.pexels.com/photos/8193716/pexels-photo-8193716.jpeg?auto=compress&cs=tinysrgb&w=600",
      "accesories"
    )
  );
  listProduct.push(
    new Product(
      "Buzo beige",
      200,
      "https://images.pexels.com/photos/9558787/pexels-photo-9558787.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
  listProduct.push(
    new Product(
      "Remera blanca",
      200,
      "https://images.pexels.com/photos/9775653/pexels-photo-9775653.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
  listProduct.push(
    new Product(
      "Blazer",
      200,
      "https://images.pexels.com/photos/12311948/pexels-photo-12311948.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
  listProduct.push(
    new Product(
      "Reloj",
      200,
      "https://images.pexels.com/photos/14808296/pexels-photo-14808296.jpeg?auto=compress&cs=tinysrgb&w=600",
      "accesories"
    )
  );
  listProduct.push(
    new Product(
      "Jean",
      200,
      "https://images.pexels.com/photos/6769359/pexels-photo-6769359.jpeg?auto=compress&cs=tinysrgb&w=600",
      "clothing"
    )
  );
}

function renderProducts() {
  listProduct.forEach((product) => {
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
    generalDiv.append(div);

    divCard.addEventListener("click", () => {
      let localProducts = localStorage.getItem("products");
      let productsJSON = JSON.parse(localProducts);
      listCart = [];
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
        listCart.push(product);
        localStorage.setItem("products", JSON.stringify(listCart));
        console.log("se agrego el producto correctamente");
      } else {
        let productsJSON = [];
        productsJSON.push(product);
        localStorage.setItem("products", JSON.stringify(productsJSON));
      }
    });
  });
}

preChargeProducts();
renderProducts();
