class CartProduct {
  constructor(name, price, img, quantity) {
    this.name = name;
    this.price = price;
    this.quantity;
    this.img = img;
    this.quantity = quantity;
  }
}

let cartProducts = [];
let envio = 10;

function preChargeListCart() {
  cartProducts = [];
  let localProducts = localStorage.getItem("products");
  let productsJSON = JSON.parse(localProducts);
  if (localProducts !== null) {
    for (const productJSON of productsJSON) {
      cartProducts.push(
        new CartProduct(
          productJSON.name,
          productJSON.price,
          productJSON.img,
          productJSON.quantity
        )
      );
    }
  }
}

function calculateSubtotal() {
  let subtotal = 0;
  cartProducts.forEach((product) => {
    subtotal += product.price * product.quantity;
  });

  return subtotal;
}

function calculateTotal() {
  let total = 0;

  total = calculateSubtotal() + envio;

  return total;
}

function renderProductsCart() {
  cartDiv.innerHTML = "";
  cartProducts.forEach((product) => {
    const div = document.createElement("div");
    div.className = "navbar-cart-product";
    const divCard = document.createElement("div");
    const imgCart = document.createElement("img");
    imgCart.src = product.img;
    imgCart.className = "imgCart";

    const divInfo = document.createElement("div");
    divInfo.className = "d-flex align-items-center";
    const nameProduct = document.createElement("h4");
    nameProduct.innerHTML = product.name;
    nameProduct.className = "link-animated";
    const quantityProduct = document.createElement("small");
    quantityProduct.innerHTML = "cantidad: " + product.quantity;
    quantityProduct.className = " d-block text-muted";
    const priceProduct = document.createElement("strong");
    priceProduct.innerHTML = "$" + product.price;
    priceProduct.className = "d-block text-sm";
    const divCont = document.createElement("div");
    const removeButton = document.createElement("a");
    removeButton.className = "align-items-end removeItem";
    removeButton.innerHTML = "x";
    removeButton.href = "#";

    divInfo.append(imgCart);
    divCont.append(nameProduct);
    divCont.append(quantityProduct);
    divCont.append(priceProduct);
    divInfo.append(divCont);
    divInfo.append(removeButton);
    divCard.append(divInfo);
    div.append(divCard);
    cartDiv.append(div);

    removeButton.addEventListener("click", () => {
      localStorage.removeItem("products");
      const indexProductToDelete = cartProducts.findIndex((productToDelete) => {
        return productToDelete.name === product.name;
      });
      cartProducts.splice(indexProductToDelete, 1);
      localStorage.setItem("products", JSON.stringify(cartProducts));
      preChargeListCart();
      renderProductsCart();
      Toastify({
        text: "Eliminaste el producto del carrito",
        duration: 4000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });

    let cartSubtotal = document.getElementById("subtotal");
    let cartTotal = document.getElementById("total");
    let cartEnvio = document.getElementById("envio");

    let subtotal = calculateSubtotal();
    let total = calculateTotal();

    cartSubtotal.innerHTML = `$${subtotal}`;
    cartTotal.innerHTML = `$${total}`;
    cartEnvio.innerHTML = `$${envio}`;
  });
}

preChargeListCart();
renderProductsCart();
